"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";

const exchangeLogos = [
  // {
  //   name: "Binance",
  //   src: "/logos/binance.svg",
  // },
  // {
  //   name: "OKX",
  //   src: "/logos/okx.svg",
  //   className: "dark:invert",
  // },
  {
    name: "BingX",
    src: "/logos/bingx.svg",
    className: "invert dark:invert-0",
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8">
      <div className="flex flex-col row-start-2 items-center sm:items-start gap-4 sm:gap-8">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          收益圖產生器
        </h1>
        <div className="flex gap-4 flex-wrap justify-center sm:justify-start sm:max-w-[calc(64px*8)]">
          {exchangeLogos.map((logo) => (
            <div key={logo.name} className="flex-shrink-0 h-6">
              <Image
                src={logo.src}
                alt={logo.name}
                width={64}
                height={64}
                style={{ width: "auto", height: "100%" }}
                className={logo.className}
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center sm:text-left">
          本工具與以上交易所無任何關聯，禁止用於非法用途。
        </p>
        <Button
          color="primary"
          isLoading={isLoading}
          startContent={isLoading ? null : <FaArrowRight />}
          variant="faded"
          className="shadow-lg font-bold"
          onPress={() => {
            setIsLoading(true);
            router.push("/generate");
          }}
        >
          產生收益圖
        </Button>
      </div>
    </div>
  );
}
