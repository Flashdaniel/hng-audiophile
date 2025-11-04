"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";

export default function OrderPage() {
  const params = useParams();
  const id = params?.id;
  const order = useQuery("getOrder", id);

  if (!order) {
    return <main className="max-w-[1110px] m-auto px-6 py-10">Loading...</main>;
  }

  const { customer, shipping, items, totals, status, createdAt } = order;

  return (
    <main className="max-w-[1110px] m-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-4">Order Confirmation</h1>
      <p className="mb-6">
        Order ID: <strong>{id}</strong>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white p-4 rounded shadow-sm">
          <h2 className="font-medium mb-2">Customer</h2>
          <p>{customer?.name}</p>
          <p>{customer?.email}</p>
          <p>{customer?.phone}</p>
        </section>

        <section className="bg-white p-4 rounded shadow-sm">
          <h2 className="font-medium mb-2">Shipping</h2>
          <p>{shipping?.addressLine1}</p>
          {shipping?.addressLine2 && <p>{shipping.addressLine2}</p>}
          <p>
            {shipping?.city}, {shipping?.state} {shipping?.postalCode}
          </p>
          <p>{shipping?.country}</p>
        </section>
      </div>

      <section className="mt-6 bg-white p-4 rounded shadow-sm">
        <h2 className="font-medium mb-2">Items</h2>
        <div>
          {items?.map((it, idx) => (
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
        </div>

        <div className="mt-4 text-right">
          <div>Subtotal: ${totals?.subtotal?.toFixed(2)}</div>
          <div>Shipping: ${totals?.shipping?.toFixed(2)}</div>
          <div>Taxes: ${totals?.taxes?.toFixed(2)}</div>
          <div className="font-bold">Total: ${totals?.total?.toFixed(2)}</div>
        </div>
      </section>

      <p className="mt-6 text-sm text-gray-600">
        Status: {status} • Placed: {new Date(createdAt).toLocaleString()}
      </p>
    </main>
  );
}
