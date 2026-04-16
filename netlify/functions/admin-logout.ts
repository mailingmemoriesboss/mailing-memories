import { buildClearedAdminSessionCookie } from "./_lib/adminAuth";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": buildClearedAdminSessionCookie(req.url),
    },
  });
};

export const config = {
  path: "/api/admin-logout",
};
