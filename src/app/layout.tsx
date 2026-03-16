import type { Metadata } from "next";
import { EB_Garamond, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://2026-giftcard-whiteday.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "지흔님을 생각하며 준비한 선물",
    template: "%s | 2026 Giftcard Whiteday",
  },
  applicationName: "2026 Giftcard Whiteday",
  description: "특별한 지흔 대표님을 생각하며 준비한 선물 페이지",
  authors: [{ name: "Jinhyeok" }],
  creator: "Jinhyeok",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "지흔님을 생각하며 준비한 선물",
    description: "특별한 지흔 대표님을 생각하며 준비한 선물 페이지",
    url: siteUrl,
    siteName: "2026 Giftcard Whiteday",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "A thoughtfully prepared gift for Jiheun",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "지흔님을 생각하며 준비한 선물",
    description: "특별한 지흔 대표님을 생각하며 준비한 선물 페이지",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${ebGaramond.variable} ${notoSerifKr.variable}`}>
        {children}
      </body>
    </html>
  );
}
