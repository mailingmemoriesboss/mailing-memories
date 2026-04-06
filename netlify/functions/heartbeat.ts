export default async (req: Request) => {
  try {
    const supabaseUrl = Netlify.env.get("SUPABASE_URL");
    const supabaseKey = Netlify.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({
          error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const heartbeatData = {
      timestamp: new Date().toISOString(),
      source: "netlify-cron",
    };

    // Attempt to insert into a 'heartbeats' table. 
    // If the table doesn't exist, this will fail gracefully but still ping the DB.
    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/heartbeats`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(heartbeatData),
      }
    );

    if (!response.ok) {
      const details = await response.text();
      // If table doesn't exist, we might get a 404 or 400. 
      // We log it but return success if it's just a missing table, 
      // as the 'fetch' itself already pinged the DB.
      console.warn(`Heartbeat table insert failed (${response.status}): ${details}`);
      
      // Even if the table insert fails, the connection was made.
      return new Response(
        JSON.stringify({ 
          ok: true, 
          message: "Pinged Supabase, but heartbeat table insert failed. Make sure the 'heartbeats' table exists.",
          status: response.status 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        message: "Heartbeat recorded successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown heartbeat error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config = {
  path: "/api/heartbeat",
  schedule: "0 0 */5 * *", // Runs at 00:00 every 5 days
};
