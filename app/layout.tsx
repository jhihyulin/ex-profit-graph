import type { Metadata } from "next";

import { Noto_Sans, Noto_Sans_TC } from "next/font/google";
import getConfig from "next/config";

import { Providers } from "./providers";
import { Footer } from "../components/footer";

import "./globals.css";

const { publicRuntimeConfig } = getConfig();

const notoSans = Noto_Sans({ subsets: ["latin"] });
const notoSansTC = Noto_Sans_TC({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "收益圖產生器",
  description:
    "還在 P 圖？還在開對衝單？現在起不需要這麼累！直接產生收益圖，營造良好績效，收割大把反傭！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body
        className={`${notoSans.className} ${notoSansTC.className} antialiased`}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <main className="min-h-screen">{children}</main>
          <Footer {...publicRuntimeConfig} />
        </Providers>
      </body>
    </html>
  );
}
