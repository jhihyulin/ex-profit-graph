"use client";

import type { ThemeProviderProps } from "next-themes";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  let local: string | undefined;
  if (typeof window == "undefined") {
    local = undefined;
  } else {
    local = navigator.language;
  }

  // from https://github.com/pacocoursey/next-themes?tab=readme-ov-file
  // useEffect only runs on the client, so now we can safely show the UI
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <NextUIProvider
      navigate={router.push}
      {...(local ? { locale: local } : {})}
    >
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
