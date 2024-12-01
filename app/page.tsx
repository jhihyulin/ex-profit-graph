import Image from "next/image";
import Link from "next/link";

const exchangeLogos = [
  // {
  //   name: "Binance",
  //   src: "/logos/binance.svg",
  // },
  // {
  //   name: "OKX",
  //   src: "/logos/okx.png",
  // },
  {
    name: "BingX",
    src: "/logos/bingx.svg",
  },
];

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center sm:text-left">
          本工具與以上交易所無任何關聯，禁止用於非法用途。
        </p>
        <Link
          className="flex items-center gap-2 px-4 py-2 text-lg font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          href="/generate"
        >
          產生收益圖
        </Link>
      </main>
    </div>
  );
}
