"use client";
import {
  QueryClientProvider as Provider,
  QueryClient,
} from "@tanstack/react-query";
import type * as React from "react";

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return <Provider client={queryClient}>{children}</Provider>;
}
