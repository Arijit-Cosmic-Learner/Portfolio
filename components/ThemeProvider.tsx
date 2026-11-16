"use client";
import { ThemeProvider as P } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <P attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>{children}</P>;
}
