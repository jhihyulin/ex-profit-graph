"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { MdBrightnessAuto } from "react-icons/md";
import { MdBrightness2 } from "react-icons/md";
import { MdBrightness7 } from "react-icons/md";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const modes = ["system", "light", "dark"];

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button
      isIconOnly
      startContent={
        theme === "system" ? (
          <MdBrightnessAuto />
        ) : theme === "light" ? (
          <MdBrightness7 />
        ) : (
          <MdBrightness2 />
        )
      }
      radius="full"
      variant="faded"
      onPress={() => {
        const i = modes.indexOf(theme || "system");
        const next = modes[(i + 1) % modes.length];
        setTheme(next);
      }}
    />
  );
}

export { ThemeSwitcher };
