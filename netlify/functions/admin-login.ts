import {
  buildAdminSessionCookie,
  createAdminSessionToken,
} from "./_lib/adminAuth";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const adminPassword = Netlify.env.get("ADMIN_PASSWORD");
    const sessionSecret = Netlify.env.get("ADMIN_SESSION_SECRET");

    if (!adminPassword || !sessionSecret) {
      return new Response(
        JSON.stringify({
          error: "Missing ADMIN_PASSWORD or ADMIN_SESSION_SECRET",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body = await req.json().catch(() => null);
    const password = typeof body?.password === "string" ? body.password : "";

    if (!password.trim()) {
      return new Response(JSON.stringify({ error: "Password is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (password !== adminPassword) {
      return new Response(JSON.stringify({ error: "Invalid password." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = createAdminSessionToken(sessionSecret);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": buildAdminSessionCookie(token, req.url),
      },
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
  path: "/api/admin-login",
};
