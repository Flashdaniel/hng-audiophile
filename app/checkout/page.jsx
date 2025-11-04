"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export default function CheckoutPage() {
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [shipping, setShipping] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const createOrder = useMutation("orders:createOrder");
  const router = useRouter();

  useEffect(() => {
    // Load cart from localStorage (non-destructive). Expect array of {id,name,price,quantity}
    try {
      const raw = localStorage.getItem("cart");
      const parsed = raw ? JSON.parse(raw) : [];
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      setItems([]);
    }
  }, []);

  const totals = React.useMemo(() => {
    const subtotal = items.reduce(
      (s, it) => s + (it.price || 0) * (it.quantity || 0),
      0
    );
    const shippingCost = subtotal > 0 ? 50 : 0;
    const taxes = +(subtotal * 0.1).toFixed(2);
    const total = +(subtotal + shippingCost + taxes).toFixed(2);
    return { subtotal, shipping: shippingCost, taxes, total };
  }, [items]);

  function validate() {
    const e = {};
    if (!customer.name.trim()) e.name = "Name is required";
    if (!validateEmail(customer.email)) e.email = "Valid email is required";
    if (!customer.phone.trim()) e.phone = "Phone is required";
    if (!shipping.addressLine1.trim()) e.addressLine1 = "Address is required";
    if (!shipping.city.trim()) e.city = "City is required";
    if (!shipping.postalCode.trim()) e.postalCode = "Postal code is required";
    if (!items.length) e.items = "Your cart is empty";
    for (let it of items) {
      if (!it.quantity || it.quantity <= 0) {
        e.items = "Cart contains invalid quantities";
        break;
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (submitting) return; // prevent duplicate submissions
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await createOrder({ customer, shipping, items, totals });
      if (res && res.orderId) {
        // Clear cart
        localStorage.removeItem("cart");
        router.push(`/order/${res.orderId}`);
      } else {
        setErrors({ submit: "Failed to create order" });
      }
    } catch (err) {
      console.error("Order creation error:", err);
      setErrors({ 
        submit: err.message || err.toString() || "Failed to create order. Please try again." 
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="max-w-[1110px] m-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} aria-describedby="form-errors">
        <section className="mb-6">
          <h2 className="font-medium mb-3">Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-sm">Full name</span>
              <input
                aria-invalid={!!errors.name}
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                className="border p-2"
              />
              {errors.name && (
                <span role="alert" className="text-sm text-red-600">
                  {errors.name}
                </span>
              )}
            </label>
            <label className="flex flex-col">
              <span className="text-sm">Email</span>
              <input
                aria-invalid={!!errors.email}
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
                className="border p-2"
              />
              {errors.email && (
                <span role="alert" className="text-sm text-red-600">
                  {errors.email}
                </span>
              )}
            </label>
            <label className="flex flex-col">
              <span className="text-sm">Phone</span>
              <input
                aria-invalid={!!errors.phone}
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
                className="border p-2"
              />
              {errors.phone && (
                <span role="alert" className="text-sm text-red-600">
                  {errors.phone}
                </span>
              )}
            </label>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="font-medium mb-3">Shipping</h2>
          <div className="grid grid-cols-1 gap-4">
            <label className="flex flex-col">
              <span className="text-sm">Address line 1</span>
              <input
                aria-invalid={!!errors.addressLine1}
                value={shipping.addressLine1}
                onChange={(e) =>
                  setShipping({ ...shipping, addressLine1: e.target.value })
                }
                className="border p-2"
              />
              {errors.addressLine1 && (
                <span role="alert" className="text-sm text-red-600">
                  {errors.addressLine1}
                </span>
              )}
            </label>
            <label className="flex flex-col">
              <span className="text-sm">Address line 2</span>
              <input
                value={shipping.addressLine2}
                onChange={(e) =>
                  setShipping({ ...shipping, addressLine2: e.target.value })
                }
                className="border p-2"
              />
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex flex-col">
                <span className="text-sm">City</span>
                <input
                  aria-invalid={!!errors.city}
                  value={shipping.city}
                  onChange={(e) =>
                    setShipping({ ...shipping, city: e.target.value })
                  }
                  className="border p-2"
                />
                {errors.city && (
                  <span role="alert" className="text-sm text-red-600">
                    {errors.city}
                  </span>
                )}
              </label>
              <label className="flex flex-col">
                <span className="text-sm">State</span>
                <input
                  value={shipping.state}
                  onChange={(e) =>
                    setShipping({ ...shipping, state: e.target.value })
                  }
                  className="border p-2"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm">Postal code</span>
                <input
                  aria-invalid={!!errors.postalCode}
                  value={shipping.postalCode}
                  onChange={(e) =>
                    setShipping({ ...shipping, postalCode: e.target.value })
                  }
                  className="border p-2"
                />
                {errors.postalCode && (
                  <span role="alert" className="text-sm text-red-600">
                    {errors.postalCode}
                  </span>
                )}
              </label>
            </div>
            <label className="flex flex-col">
              <span className="text-sm">Country</span>
              <input
                value={shipping.country}
                onChange={(e) =>
                  setShipping({ ...shipping, country: e.target.value })
                }
                className="border p-2"
              />
            </label>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="font-medium mb-3">Order</h2>
          <div className="bg-white p-4 rounded shadow-sm">
            {items.length === 0 && <p>Your cart is empty</p>}
            {items.map((it, idx) => (
              <div
                key={idx}
                className="flex justify-between py-2 border-b last:border-b-0"
              >
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-gray-600">
                    ${it.price.toFixed(2)} each
                  </div>
                </div>
                <div className="text-right">
                  <div>Qty: {it.quantity}</div>
                  <div className="font-medium">
                    ${(it.price * it.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-4 text-right">
              <div>Subtotal: ${totals.subtotal.toFixed(2)}</div>
              <div>Shipping: ${totals.shipping.toFixed(2)}</div>
              <div>Taxes: ${totals.taxes.toFixed(2)}</div>
              <div className="font-bold">Total: ${totals.total.toFixed(2)}</div>
            </div>
            {errors.items && (
              <div role="alert" className="text-red-600 mt-2">
                {errors.items}
              </div>
            )}
          </div>
        </section>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-black text-white rounded"
          >
            {submitting ? "Submitting..." : "Place Order"}
          </button>
          {errors.submit && (
            <div role="alert" className="text-red-600">
              {errors.submit}
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
