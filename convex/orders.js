import { mutation, query } from "./_generated/server";

// Create an order, store it in the DB and send a confirmation email if
// SENDGRID_API_KEY is configured.
export const createOrder = mutation(
  async ({ db }, { customer, shipping, items, totals }) => {
    try {
      const order = {
        customer,
        shipping,
        items,
        totals,
        status: "processing",
        createdAt: Date.now(),
      };

      const inserted = await db.insert("orders", order);
      const orderId = inserted._id;

      // Note: Email sending should be done in a separate action since mutations
      // cannot make external HTTP calls. For now, order creation works without email.
      // TODO: Create a separate action for sending order confirmation emails.

      return { orderId };
    } catch (error) {
      console.error("Error creating order:", error);
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }
);

export const getOrder = query(async ({ db }, orderId) => {
  return await db.get(orderId);
});
