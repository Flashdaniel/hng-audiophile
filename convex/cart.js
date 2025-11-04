// convex/cart.js
import { mutation, query } from "./_generated/server";

// Add item to cart
export const addToCart = mutation(
  async ({ db }, { productId, quantity, name, price }) => {
    const existing = await db
      .query("cart")
      .filter((q) => q.eq(q.field("productId"), productId))
      .first();

    if (existing) {
      await db.patch(existing._id, { quantity: existing.quantity + quantity });
    } else {
      await db.insert("cart", { productId, name, price, quantity });
    }
  }
);

// Get all cart items
export const getCart = query(async ({ db }) => {
  return await db.query("cart").collect();
});

// Get total number of items
export const getCartCount = query(async ({ db }) => {
  const items = await db.query("cart").collect();
  return items.reduce((sum, item) => sum + item.quantity, 0);
});

// Checkout (collect user info)
export const checkout = mutation(async ({ db }, { name, email, address }) => {
  const cartItems = await db.query("cart").collect();

  // In real app you’d create an order here
  await db.insert("orders", { name, email, address, items: cartItems });

  // Clear cart after checkout
  for (let item of cartItems) {
    await db.delete(item._id);
  }

  return { success: true };
});
