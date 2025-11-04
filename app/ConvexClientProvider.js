"use client";

import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

// Create Convex client using the public URL from environment. This file
// lives in `app/` so Next will make NEXT_PUBLIC_* env vars available.
const convexClient = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export function ConvexClientProvider({ children }) {
  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}
