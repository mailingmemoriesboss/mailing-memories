export default async () => {
  const supabaseUrl = Netlify.env.get("SUPABASE_URL");
  const supabaseKey = Netlify.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  const response = await fetch(
    `${supabaseUrl.replace(/\/$/, "")}/rest/v1/orders?select=id&limit=1`,
    {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Supabase heartbeat failed (${response.status}): ${details.slice(0, 500)}`
    );
  }

  console.log("Supabase heartbeat succeeded.");
};

export const config = {
  schedule: "0 0 */5 * *", // Runs at 00:00 UTC every 5 days
};
