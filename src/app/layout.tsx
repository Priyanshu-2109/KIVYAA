import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kivyaa Jewels | Luxury Jewellery — Chic Adornments",
  description:
    "Discover exquisite handcrafted jewellery at Kivyaa Jewels. Premium rings, necklaces, earrings, and bracelets combining timeless elegance with contemporary design.",
  keywords: [
    "luxury jewellery",
    "gold jewellery",
    "diamond rings",
    "handcrafted jewellery",
    "Kivyaa Jewels",
    "Indian jewellery",
  ],
  openGraph: {
    title: "Kivyaa Jewels | Luxury Jewellery",
    description:
      "Exquisite handcrafted jewellery combining timeless elegance with contemporary design.",
    type: "website",
    locale: "en_IN",
    siteName: "Kivyaa Jewels",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased bg-luxury-black text-luxury-cream`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
