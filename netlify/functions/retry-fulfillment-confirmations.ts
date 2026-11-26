import { runFulfillmentQueue } from "./_lib/fulfillmentConfirmation";
export default async ()=>runFulfillmentQueue();
export const config={schedule:"*/15 * * * *"};
