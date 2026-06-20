import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple AI Academy | Master AI without Complexity",
  description:
    "100% Live, practical, and Simple training. Learn how to use advanced AI tools through real-world examples that save you hours every single week.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
