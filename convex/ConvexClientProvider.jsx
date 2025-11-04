"use client";

// This file is retained for compatibility but must not instantiate
// a ConvexReactClient at module evaluation time because the Convex
// deployment step analyzes files under `convex/` and environment
// variables (NEXT_PUBLIC_CONVEX_URL) are not available there.
//
// The real provider lives in `app/ConvexClientProvider.js`. Export
// a no-op passthrough here to avoid deployment-time errors.

export function ConvexClientProvider({ children }) {
  return children;
}
