import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Alex_Brush } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: siteConfig.metaTitle,
  description: siteConfig.metaDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${jost.variable} ${alexBrush.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}
