"use client";

import ErrorBoundary from "@/components/common/ErrorBoundary";

export default function ShopError({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorBoundary error={error} reset={reset} />;
}
