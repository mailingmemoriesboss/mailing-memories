import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type OrderRow = {
  id: string;
  created_at: string;
  updated_at: string;
  order_type: "send_now" | "scheduled";
  status: string;
  occasion: string | null;
  occasion_custom: string | null;
  sender_name: string;
  sender_email: string;
  recipient_name: string;
  city: string;
  state_region: string;
  requested_ship_date: string | null;
  amount_cents: number;
};

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  return { supabaseUrl, supabaseKey };
}

async function fetchOrdersFromSupabase(): Promise<OrderRow[]> {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  const query =
    "select=id,created_at,updated_at,order_type,status,occasion,occasion_custom,sender_name,sender_email,recipient_name,city,state_region,requested_ship_date,amount_cents&order=created_at.desc";

  const response = await fetch(`${supabaseUrl}/rest/v1/orders?${query}`, {
    method: "GET",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as OrderRow[];
  return data;
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({
      ok: true,
      hasSupabaseUrl: Boolean(process.env.SUPABASE_URL),
      hasSupabaseKey: Boolean(
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
      ),
    });
  });

  app.get("/api/orders", async (_req, res) => {
    try {
      const orders = await fetchOrdersFromSupabase();
      res.json({ orders });
    } catch (error) {
      res.status(503).json({
        error:
          error instanceof Error
            ? error.message
            : "Unable to load orders from Supabase.",
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all non-API routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
