export default async () => {
  return new Response(
    JSON.stringify({
      error: "This legacy order endpoint has been retired. Use the live /send checkout flow.",
    }),
    {
      status: 410,
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const config = {
  path: "/api/create-order",
};
