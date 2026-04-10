import type { Metadata } from "next";
import { QueryProvider } from "@/lib/QueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muse",
  description: "Muse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
