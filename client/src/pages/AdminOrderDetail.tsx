import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { PageShell } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type Order = Record<string, any>;

function formatMoney(amountCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((amountCents || 0) / 100);
}

function formatDate(dateString?: string | null) {
  if (!dateString) return "Next 1–2 business days";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function extractNote(notes: string, label: string) {
  const line = notes
    .split("\n")
    .find((item) => item.toLowerCase().startsWith(label.toLowerCase()));
  return line ? line.slice(label.length).trim() : "";
}

export default function AdminOrderDetail() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingStatus, setSavingStatus] = useState("");
  const [error, setError] = useState("");

  const id = useMemo(() => new URLSearchParams(window.location.search).get("id"), []);

  async function loadOrder() {
    if (!id) {
      setError("No order ID was provided.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await fetch(`/api/order-detail?id=${encodeURIComponent(id)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to load order.");
      setOrder(data.order);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load order.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrder();
  }, [id]);

  async function updateStatus(status: string) {
    if (!order) return;
    try {
      setSavingStatus(status);
      const response = await fetch("/api/update-order-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: order.id, status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to update status.");
      setOrder((current) => current ? { ...current, status } : current);
      toast.success(`Order marked ${status.replaceAll("_", " ")}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to update status.");
    } finally {
      setSavingStatus("");
    }
  }

  if (loading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-[900px] px-6 py-16 flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading order…
        </div>
      </PageShell>
    );
  }

  if (error || !order) {
    return (
      <PageShell>
        <div className="mx-auto max-w-[900px] px-6 py-16">
          <p className="mb-6">{error || "Order not found."}</p>
          <Link href="/admin/orders"><a>← Back to orders</a></Link>
        </div>
      </PageShell>
    );
  }

  const notes = order.internal_notes || "";
  const frontMessage = extractNote(notes, "Front of card:");
  const returnName = extractNote(notes, "Return name:");
  const returnAddress1 = extractNote(notes, "Return address 1:");
  const returnAddress2 = extractNote(notes, "Return address 2:");
  const returnCityStateZip = extractNote(notes, "Return city/state/zip:");

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-[1000px]" style={{ padding: "40px 24px 80px" }}>
        <div className="mb-6">
          <Link href="/admin/orders">
            <a style={{ fontFamily: "var(--font-sans)", color: "var(--mm-ink-muted)", textDecoration: "none" }}>
              ← Back to orders
            </a>
          </Link>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <p style={{ margin: "0 0 8px", fontFamily: "var(--font-sans)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mm-ink-muted)" }}>
              Fulfillment View
            </p>
            <h1 style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--mm-forest)" }}>
              Order for {order.recipient_name}
            </h1>
            <p style={{ margin: "10px 0 0", color: "var(--mm-ink-muted)" }}>
              Order {String(order.id).slice(0, 8)} · {formatMoney(order.amount_cents)}
            </p>
          </div>
          <Badge>{String(order.status).replaceAll("_", " ")}</Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Card</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {frontMessage && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Front</div>
                  <div className="text-lg">{frontMessage}</div>
                </div>
              )}
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Inside message</div>
                <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{order.message_text}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Signature</div>
                <div>{order.signature_name || order.sender_name}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Envelope</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Recipient</div>
                <div style={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>
                  {order.recipient_name}{"\n"}
                  {order.address_line1}
                  {order.address_line2 ? `\n${order.address_line2}` : ""}{"\n"}
                  {order.city}, {order.state_region} {order.postal_code}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Return address</div>
                <div style={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>
                  {returnName || "—"}
                  {returnAddress1 ? `\n${returnAddress1}` : ""}
                  {returnAddress2 ? `\n${returnAddress2}` : ""}
                  {returnCityStateZip ? `\n${returnCityStateZip}` : ""}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Mailing date</div>
                <div>{formatDate(order.requested_ship_date)}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Customer</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><strong>Name:</strong> {order.sender_name}</div>
              <div><strong>Email:</strong> {order.sender_email}</div>
              <div><strong>Paid:</strong> {formatMoney(order.amount_cents)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Fulfillment</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Move the order through each stage as you complete it.
              </p>
              <div className="flex flex-wrap gap-2">
                {["writing", "written", "mailed", "completed"].map((status) => (
                  <Button
                    key={status}
                    variant={order.status === status ? "default" : "outline"}
                    disabled={Boolean(savingStatus)}
                    onClick={() => updateStatus(status)}
                  >
                    {savingStatus === status && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {status === "writing" ? "Start Writing" : status === "written" ? "Card Written" : status === "mailed" ? "Mark Mailed" : "Complete Order"}
                  </Button>
                ))}
              </div>
              <div className="mt-5 p-4 border rounded-md text-sm" style={{ lineHeight: 1.6 }}>
                On mailing day, send the customer a photo preview of the completed card and addressed envelope at <strong>{order.sender_email}</strong>.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
