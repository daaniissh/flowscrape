"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme(); // 'light' or 'dark'
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Prevent hydration mismatch
  }, []);

  if (!mounted) return null;

  return (
    <ClerkProvider
      afterSignOutUrl="/sign-in"
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
       
      }}
    >
      <html lang="en">
        <body className="font-sans">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
