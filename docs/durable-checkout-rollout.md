# Durable checkout rollout (not production-ready until verified)

## Scope
Save a validated pending order before redirecting to Stripe; link the exact Checkout Session before returning its URL; reconcile from a signed server-side webhook or verified return. The conditional payment update prevents duplicate order inserts and prevents replay from resetting fulfillment. No new database schema is required by this patch. The $15 price and promotion codes are unchanged.

## Test setup — do not use live customer data
- Use an isolated Supabase test database/project with the same orders schema and RLS; set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY only in the server environment. Do not test with production credentials.
- Set STRIPE_SECRET_KEY to a Stripe test secret, STRIPE_CARD_PRICE_ID to the matching test-mode USD 1500-cent price, and STRIPE_WEBHOOK_SECRET to the test event destination signing secret.
- Register /api/stripe-webhook on the test deployment for checkout.session.completed and checkout.session.async_payment_succeeded. Never paste secrets in a PR, chat or commit.
- Verify Netlify preview credentials are isolated before opening checkout. Do not merge until the tests below pass.
- Run pnpm exec vitest run netlify/functions/_lib/durableOrders.test.ts; pnpm check; pnpm build. Verify Netlify functions bundle too.

## End-to-end acceptance checks
- Complete a normal test checkout and verify one pending row before redirect and one paid row after payment.
- Close the browser on Stripe after paying, without returning; verify webhook marks the original order paid with all saved details.
- Return with browser storage cleared; verify the receipt does not depend on browser data.
- Replay the same webhook twice and concurrently with browser confirmation; assert exactly one paid row and unchanged later fulfillment status.
- Reject unsigned/malformed webhooks, invalid session and wrong amount. Confirm a valid 100% promotion is accepted.
- Verify canceled/abandoned checkouts are not fulfilled or counted as revenue. Pending rows must not be manually deleted or promoted to paid. Design an expiry/reconciliation workflow before ongoing use; retain only necessary pending customer data.
- Simulate DB failure before checkout and during webhook processing; verify no payment link is issued before persistence and webhook returns a retryable failure.
- Verify admin access and order display; inspect all status transitions, anonymization and any existing automation to ensure pending rows are excluded from fulfillment.
- Review rate limiting and retention for the public checkout endpoint.
- Confirm customer privacy: no letter or address in Stripe metadata or public confirmation API.

## Production cutover gates
- Reconcile Stripe payments against existing orders and identify legacy sessions. Because pre-change sessions only kept details in browser storage, this patch cannot recover them automatically. Allow old sessions to expire or explicitly reconcile them before switching the finalization endpoint; schedule a controlled cutover, preserving all existing orders.
- Register production webhook and configure its own secret and correct live price; confirm deployed endpoint and key scopes, then monitor delivery attempts.
- Owner notification and retry/outbox, daily reconciliation, abandoned-order retention and email delivery testing remain separate unfinished tasks. Do not label notification reliability fixed.
- No production deploy, Stripe configuration or test payment is authorized by this document. Roll back via previous known-good deploy only with reconciliation of orders created after cutover.
