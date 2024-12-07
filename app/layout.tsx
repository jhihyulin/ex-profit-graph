import type { Metadata } from "next";
import getConfig from "next/config";
import { Noto_Sans, Noto_Sans_TC } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "../components/theme-switcher";
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
        <NextUIProvider>
          <ThemeProvider attribute="class" enableSystem={true}>
            {children}
            <footer className="row-start-3 flex flex-col items-center justify-center">
              <ThemeSwitcher />
              <Link
                href="https://github.com/jhihyulin/ex-profit-graph"
                color="foreground"
                size="sm"
                underline="hover"
              >
                Repository
              </Link>
              <p className="text-sm text-center w-full">
                v{publicRuntimeConfig.version}
              </p>
              <p className="text-sm text-center w-full">
                &copy; {new Date().getFullYear()} jhihyulin. Licensed under the
                GNU General Public License, version 3.
              </p>
            </footer>
          </ThemeProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
