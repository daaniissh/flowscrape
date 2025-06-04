"use client";

import { ThemeProvider } from "next-themes";
import { ClerkProviderWrapper } from "../ClerkThemeProvider";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NextTopLoader from "nextjs-toploader";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <NextTopLoader color="#10b981" showSpinner={false} />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ClerkProviderWrapper>{children}</ClerkProviderWrapper>
      </ThemeProvider>
      {/* <ReactQueryDevtools/> */}
    </QueryClientProvider>
  );
}
