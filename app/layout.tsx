import type { Metadata } from "next";
import Image from "next/image";
import getConfig from "next/config";
import { Noto_Sans, Noto_Sans_TC } from "next/font/google";
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
    <html lang="zh-Hant">
      <body
        className={`${notoSans.className} ${notoSansTC.className} antialiased`}
      >
        {children}
        <footer className="row-start-3 flex flex-col items-center justify-center">
          <a
            className="flex items-center gap-2 hover:opacity-80"
            href="https://github.com/jhihyulin/ex-profit-graph"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/logos/github-mark.svg"
              alt="GitHub mark"
              width={32}
              height={32}
            />
          </a>
          <p className="text-sm text-center w-full">
            v{publicRuntimeConfig.version}
          </p>
          <p className="text-sm text-center w-full">
            &copy; {new Date().getFullYear()} jhihyulin. Licensed under the GNU
            General Public License, version 3.
          </p>
        </footer>
      </body>
    </html>
  );
}
