"use client";

import { Link } from "@nextui-org/react";

import { ThemeSwitcher } from "./theme-switcher";

export default function Footer(publicRuntimeConfig: {
  version: string;
}): JSX.Element {
  return (
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
        &copy; {new Date().getFullYear()} jhihyulin. Licensed under the GNU
        General Public License, version 3.
      </p>
    </footer>
  );
}

export { Footer };
