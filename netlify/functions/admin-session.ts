import {
  readAdminSessionCookie,
  verifyAdminSessionToken,
} from "./_lib/adminAuth";

export default async (req: Request) => {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const sessionSecret = Netlify.env.get("ADMIN_SESSION_SECRET");

    if (!sessionSecret) {
      return new Response(
        JSON.stringify({ error: "Missing ADMIN_SESSION_SECRET" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const token = readAdminSessionCookie(req);
    const authenticated = verifyAdminSessionToken(token, sessionSecret);

    if (!authenticated) {
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ authenticated: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown function error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config = {
  path: "/api/admin-session",
};
