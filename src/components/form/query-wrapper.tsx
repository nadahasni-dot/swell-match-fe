"use client";

import { queryClient } from "@/lib/utils";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

export default function QueryWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
