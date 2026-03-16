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

export const metadata: Metadata = {
  title: "A Gift For You",
  description: "지흔님만을 위해 준비 중인 선물 카드 페이지",
  openGraph: {
    title: "A Gift For You",
    description: "지흔님만을 위해 준비 중인 선물 카드 페이지",
    type: "website",
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
