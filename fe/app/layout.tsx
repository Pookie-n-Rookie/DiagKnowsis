import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flowra — Work flows beautifully here",
  description: "Flowra connects your team, data, and automation in one seamless workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}