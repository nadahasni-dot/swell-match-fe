import "./globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { bodoni_moda, inter } from "@/components/font/font";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Swell Match",
  description: "Book your surfing experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          bodoni_moda.variable
        )}
      >
        {children}
        <Toaster expand richColors position="top-right" />
      </body>
    </html>
  );
}
