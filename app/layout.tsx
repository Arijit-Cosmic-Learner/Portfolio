import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { VisitTracker } from "@/components/VisitTracker";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jb = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jb", display: "swap" });

export const metadata: Metadata = {
  title: "Arijit Mitra | Senior Product Solutions Engineer",
  description: "Solutions engineering, program management and AI-assisted development across fintech and credit platforms.",
  openGraph: { title: "Arijit Mitra", description: "I close the gap between customers, product and engineering.", type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#14110f" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${inter.variable} ${jb.variable}`}>
      <body>
        <ThemeProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <VisitTracker />
        </ThemeProvider>
      </body>
    </html>
  );
}
