"use client"

import { ThemeProvider } from "next-themes"
import { ClerkProviderWrapper } from "../ClerkThemeProvider"

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <ClerkProviderWrapper>{children}</ClerkProviderWrapper>
  </ThemeProvider>
}