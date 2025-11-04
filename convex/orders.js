import { mutation, query } from "./_generated/server";

// Create an order, store it in the DB and send a confirmation email if
// SENDGRID_API_KEY is configured.
export const createOrder = mutation(
  async ({ db }, { customer, shipping, items, totals }) => {
    const order = {
      customer,
      shipping,
      items,
      totals,
      status: "processing",
      createdAt: new Date(),
    };

    const inserted = await db.insert("orders", order);
    const orderId = inserted._id;

    // Try to send confirmation email via SendGrid if API key is available.
    const sendgridKey = process.env.SENDGRID_API_KEY;
    const sendgridFrom =
      process.env.SENDGRID_FROM || "no-reply@audiophile.example";
    try {
      if (sendgridKey) {
        const itemsHtml = items
          .map(
            (it) =>
              `<tr><td style=\"padding:6px 10px\">${it.name}</td><td style=\"padding:6px 10px\">${it.quantity}</td><td style=\"padding:6px 10px\">$${(
                it.price * it.quantity
              ).toFixed(2)}</td></tr>`
          )
          .join("");

        const html = `
        <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.4;color:#111">
          <h2>Hi ${customer.name},</h2>
          <p>Thanks for your order! Your order ID is <strong>${orderId}</strong>.</p>
          <h3>Order summary</h3>
          <table style="width:100%;border-collapse:collapse"> 
            <thead>
              <tr>
                <th style="text-align:left;padding:6px 10px">Item</th>
                <th style="text-align:right;padding:6px 10px">Qty</th>
                <th style="text-align:right;padding:6px 10px">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <p><strong>Subtotal:</strong> $${totals.subtotal.toFixed(2)}</p>
          <p><strong>Shipping:</strong> $${totals.shipping.toFixed(2)}</p>
          <p><strong>Taxes:</strong> $${totals.taxes.toFixed(2)}</p>
          <p><strong>Total:</strong> $${totals.total.toFixed(2)}</p>
          <h3>Shipping details</h3>
          <p>${shipping.addressLine1}<br/>${shipping.addressLine2 ? shipping.addressLine2 + "<br/>" : ""}${shipping.city}, ${shipping.state} ${shipping.postalCode}<br/>${shipping.country}</p>
          <p>If you need help, reply to this email or contact support@example.com.</p>
          <p><a href="#">View your order</a></p>
        </div>
      `;

        await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sendgridKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email: customer.email }],
              },
            ],
            from: { email: sendgridFrom, name: "Audiophile" },
            subject: `Your Audiophile order (${orderId})`,
            content: [{ type: "text/html", value: html }],
          }),
        });
      }
    } catch (e) {
      // Do not fail the mutation if email sending fails. Log to console for debugging.
      console.error("Failed to send order confirmation email:", e);
    }

    return { orderId };
  }
);

export const getOrder = query(async ({ db }, orderId) => {
  return await db.get(orderId);
});
