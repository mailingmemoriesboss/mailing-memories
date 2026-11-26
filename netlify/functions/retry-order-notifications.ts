import { runNotificationQueue } from "./_lib/orderNotifications";
import { json } from "./_lib/durableOrders";

export default async () => {
  try {
    return await runNotificationQueue();
  } catch {
    console.error("Owner notification retry worker failed; review outbox and configuration.");
    return json(503, { error: "Notification worker failed" });
  }
};
export const config = { schedule: "*/15 * * * *" };
