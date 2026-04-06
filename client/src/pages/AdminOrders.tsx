import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { PageShell } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Eraser, Loader2 } from "lucide-react";
import { toast } from "sonner";

type OrderStatus =
  | "draft"
  | "pending_payment"
  | "paid"
  | "queued"
  | "writing"
  | "written"
  | "mailed"
  | "completed"
  | "cancelled";

type OrderRow = {
  id: string;
  created_at: string;
  updated_at: string;
  order_type: "send_now" | "scheduled";
  status: OrderStatus;
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

const badgeVariantMap: Record<OrderStatus, "default" | "secondary" | "outline" | "destructive"> = {
  draft: "outline",
  pending_payment: "secondary",
  paid: "default",
  queued: "secondary",
  writing: "secondary",
  written: "secondary",
  mailed: "default",
  completed: "default",
  cancelled: "destructive",
};

function formatMoney(amountCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amountCents / 100);
}

function formatDate(dateString: string | null) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiReady, setApiReady] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isClearingTests, setIsClearingTests] = useState(false);

  async function loadOrders() {
    try {
      setLoading(true);
      setErrorMessage("");

      const res = await fetch("/api/orders");
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      const rows = Array.isArray(data) ? data : Array.isArray(data.orders) ? data.orders : [];

      setOrders(rows);
      setApiReady(true);
    } catch (error) {
      setApiReady(false);
      setOrders([]);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Admin API is not connected yet."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const summary = useMemo(() => {
    const paid = orders.filter((o) => o.status === "paid").length;
    const scheduled = orders.filter((o) => o.order_type === "scheduled").length;
    const active = orders.filter((o) =>
      ["paid", "queued", "writing", "written", "mailed"].includes(o.status)
    ).length;
    const revenue = orders.reduce((sum, order) => sum + (order.amount_cents || 0), 0);

    return { paid, scheduled, active, revenue };
  }, [orders]);

  const handleDeleteOrder = async (id: string) => {
    try {
      setIsDeleting(id);
      const res = await fetch(`/api/delete-order?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete order");
      }

      toast.success("Order deleted successfully");
      loadOrders();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error deleting order");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleClearTestOrders = async () => {
    try {
      setIsClearingTests(true);
      const res = await fetch("/api/delete-order?clearTest=true", {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to clear test orders");
      }

      const data = await res.json();
      toast.success(`Cleared ${data.deletedCount || 0} test orders`);
      loadOrders();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error clearing test orders");
    } finally {
      setIsClearingTests(false);
    }
  };

  return (
    <PageShell>
      <section
        className="mx-auto w-full max-w-[1240px]"
        style={{ padding: "48px 24px 80px" }}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--mm-ink-muted)",
                marginBottom: "12px",
              }}
            >
              Internal Admin
            </p>

            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 5vw, 3.4rem)",
                lineHeight: 1,
                color: "var(--mm-forest)",
                marginBottom: "16px",
              }}
            >
              Orders
            </h1>

            <p
              style={{
                maxWidth: "720px",
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "var(--mm-ink-muted)",
              }}
            >
              This is your daily operating view. Manage live orders and perform system cleanup here.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-mm-line text-mm-ink" disabled={isClearingTests}>
                  {isClearingTests ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eraser className="h-4 w-4" />}
                  Clear Test Orders
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete all orders marked as test, admin_test, or keepalive. Real customer orders will not be affected.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearTestOrders} className="bg-mm-forest text-white">
                    Clear Tests
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Link href="/send">
              <a
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "40px",
                  padding: "0 16px",
                  border: "1px solid var(--mm-line)",
                  color: "var(--mm-ink)",
                  textDecoration: "none",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9rem",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.7)",
                }}
              >
                Open Send a Letter
              </a>
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
              <CardDescription>All rows currently visible in admin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{orders.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paid</CardTitle>
              <CardDescription>Orders ready for fulfillment flow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{summary.paid}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scheduled</CardTitle>
              <CardDescription>Future-dated letters in the queue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{summary.scheduled}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Value</CardTitle>
              <CardDescription>Visible order total</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{formatMoney(summary.revenue)}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Order Queue</CardTitle>
            <CardDescription>
              Manage and fulfill your customer orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!apiReady && (
              <div
                style={{
                  marginBottom: "16px",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "1px solid rgba(139, 58, 58, 0.14)",
                  background: "rgba(139, 58, 58, 0.05)",
                  color: "var(--mm-ink)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.92rem",
                  lineHeight: 1.6,
                }}
              >
                Current message: {errorMessage || "API route not available yet."}
              </div>
            )}

            {loading ? (
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--mm-ink-muted)",
                }}
              >
                Loading admin view…
              </div>
            ) : orders.length === 0 ? (
              <div
                style={{
                  border: "1px dashed var(--mm-line)",
                  borderRadius: "12px",
                  padding: "24px",
                  fontFamily: "var(--font-sans)",
                  color: "var(--mm-ink-muted)",
                  lineHeight: 1.7,
                }}
              >
                No orders are showing yet.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Sender</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Ship Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{formatDate(order.created_at)}</TableCell>
                      <TableCell>
                        <Badge variant={badgeVariantMap[order.status]}>
                          {order.status.replaceAll("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.order_type.replaceAll("_", " ")}</TableCell>
                      <TableCell>
                        <div className="font-medium">{order.sender_name}</div>
                        <div className="text-xs text-muted-foreground">{order.sender_email}</div>
                      </TableCell>
                      <TableCell>{order.recipient_name}</TableCell>
                      <TableCell>
                        {order.city}, {order.state_region}
                      </TableCell>
                      <TableCell>{formatDate(order.requested_ship_date)}</TableCell>
                      <TableCell>{formatMoney(order.amount_cents)}</TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-mm-ink-muted hover:text-destructive" disabled={isDeleting === order.id}>
                              {isDeleting === order.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Order?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the order from <strong>{order.sender_name}</strong> to <strong>{order.recipient_name}</strong>? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteOrder(order.id)} className="bg-destructive text-white hover:bg-destructive/90">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
