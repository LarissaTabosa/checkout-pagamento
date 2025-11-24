import { Hono } from "hono";

const app = new Hono();

app.get("/api/checkout", async (c) => {
  const paymentGatewayUrl = (c.env as any).PAYMENT_GATEWAY_URL;
  
  if (!paymentGatewayUrl) {
    return c.text("Payment gateway URL not configured", 500);
  }

  return c.redirect(paymentGatewayUrl);
});

export default app;
