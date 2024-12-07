import { Rubik } from "next/font/google";
import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { DateInput, DateValue } from "@nextui-org/react";
import { TimeInput, TimeInputValue } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { getLocalTimeZone } from "@internationalized/date";
import { FaUpLong } from "react-icons/fa6";
import { FaDownLong } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";

import { FormProps, GenerateProps } from "../props";
import { formatDate, formatNumber } from "../../modules/format";

const rubik = Rubik({ subsets: ["latin"] });

interface BingXData {
  pairStandard: string;
  pairQuote: string;
  sideIsBuy: boolean;
  tradeMode: string;
  tradeModes: {
    [key: string]: string;
  };
  leverage: number;
  profitPercentage: number;
  profitAmount: number;
  profitMode: string;
  profitModes: {
    [key: string]: string;
  };
  openPrice: number;
  closePrice: number;
  date: DateValue;
  time: TimeInputValue;
  avatar: string;
  username: string;
  referralCode: string;
  version: string;
  versions?: {
    [key: string]: string;
  };
  style: string;
  styles?: {
    [key: string]: string;
  };
  backgrounds?: {
    [key: string]: {
      loss: {
        [key: string]: string;
      };
      profit: {
        [key: string]: string;
      };
    };
  };
}

const defaultBingXData: BingXData = {
  pairStandard: "BTC",
  pairQuote: "USDT",
  sideIsBuy: true,
  tradeMode: "future",
  tradeModes: {
    // spot: "現貨",
    future: "合約",
  },
  leverage: 125,
  profitPercentage: 0,
  profitAmount: 0,
  profitMode: "percentage",
  profitModes: {
    percentage: "收益率",
    amount: "收益額",
  },
  openPrice: 0,
  closePrice: 0,
  date: parseDate(formatDate(new Date(), "yyyy-MM-dd")),
  time: parseAbsoluteToLocal(new Date().toISOString()),
  avatar: "",
  username: "Harvest Chives",
  referralCode: "VWZLJ6",
  version: "v7",
  versions: {
    v6: "UFC 拳擊手",
    v7: "切爾西足球俱樂部",
  },
  style: "style1",
  styles: {
    style1: "綠漲紅跌",
    style2: "紅漲綠跌",
  },
  backgrounds: {
    v6: {
      loss: {
        style1: "./graph/bingx/v6/loss_style1_V3.png",
        style2: "./graph/bingx/v6/loss_style2_V3.png",
      },
      profit: {
        style1: "./graph/bingx/v6/profit_style1_V3.png",
        style2: "./graph/bingx/v6/profit_style2_V3.png",
      },
    },
    v7: {
      loss: {
        style1: "./graph/bingx/v7/loss_style1_V6.png",
        style2: "./graph/bingx/v7/loss_style2_V6.png",
      },
      profit: {
        style1: "./graph/bingx/v7/profit_style1_V6.png",
        style2: "./graph/bingx/v7/profit_style2_V6.png",
      },
    },
  },
};

function BingXOption(
  data: BingXData,
  setData: React.Dispatch<React.SetStateAction<BingXData>>
) {
  return {
    name: "BingX",
    value: "bingx",
    scale: 3,
    data: data,
    form: <BingXForm data={data} setData={setData} />,
    generate: <BingXGenerate data={data} />,
  };
}

const BingXForm: React.FC<FormProps<BingXData>> = ({ data, setData }) => (
  <div>
    <div className="flex flex-row gap-2 items-center">
      <Select
        disallowEmptySelection
        className="w-1/2"
        variant="faded"
        label="版本"
        placeholder="選擇版本"
        selectedKeys={[data.version]}
        value={data.version}
        onSelectionChange={(keys) =>
          setData({ ...data, version: Array.from(keys).join("") })
        }
      >
        {Object.entries(data.versions!).map(([key, value]) => (
          <SelectItem key={key} value={key}>
            {value}
          </SelectItem>
        ))}
      </Select>
      <Select
        disallowEmptySelection
        className="w-1/2"
        variant="faded"
        label="風格"
        placeholder="選擇風格"
        selectedKeys={[data.style]}
        value={data.style}
        onSelectionChange={(keys) =>
          setData({ ...data, style: Array.from(keys).join("") })
        }
      >
        {Object.entries(data.styles!).map(([key, value]) => (
          <SelectItem key={key} value={key}>
            {value}
          </SelectItem>
        ))}
      </Select>
    </div>
    <div className="flex flex-row gap-2 mt-2 items-center">
      <Button
        startContent={data.sideIsBuy ? <FaUpLong /> : <FaDownLong />}
        size="lg"
        className="shadow-lg font-bold w-1/3"
        color={
          data.style === "style1"
            ? data.sideIsBuy
              ? "success"
              : "danger"
            : data.sideIsBuy
            ? "danger"
            : "success"
        }
        variant="faded"
        onPress={() => setData({ ...data, sideIsBuy: !data.sideIsBuy })}
      >
        {data.sideIsBuy ? "買" : "賣"}
      </Button>
      <Input
        variant="faded"
        label="標準貨幣"
        placeholder="BTC"
        className="w-1/3"
        type="text"
        spellCheck="false"
        value={data.pairStandard}
        onChange={(e) => setData({ ...data, pairStandard: e.target.value })}
      />
      <Input
        variant="faded"
        label="報價貨幣"
        placeholder="USDT"
        className="w-1/3"
        type="text"
        spellCheck="false"
        value={data.pairQuote}
        onChange={(e) => setData({ ...data, pairQuote: e.target.value })}
      />
    </div>
    <div className="flex flex-row gap-2 mt-2 items-center">
      <Select
        disallowEmptySelection
        className="w-1/2"
        variant="faded"
        label="交易模式"
        placeholder="選擇交易模式"
        selectedKeys={[data.tradeMode]}
        value={data.tradeMode}
        onSelectionChange={(keys) =>
          setData({ ...data, tradeMode: Array.from(keys).join("") })
        }
      >
        {Object.entries(data.tradeModes!).map(([key, value]) => (
          <SelectItem key={key} value={key}>
            {value}
          </SelectItem>
        ))}
      </Select>
      <Input
        variant="faded"
        label="槓桿"
        placeholder="125"
        className="w-1/2"
        type="number"
        value={String(data.leverage)}
        onChange={(e) =>
          setData({ ...data, leverage: parseInt(e.target.value || "0") })
        }
      />
    </div>
    <div className="flex flex-row gap-2 mt-2 items-center">
      <Select
        disallowEmptySelection
        className="w-2/5"
        variant="faded"
        label="收益模式"
        placeholder="選擇收益模式"
        selectedKeys={[data.profitMode]}
        value={data.profitMode}
        onSelectionChange={(keys) =>
          setData({ ...data, profitMode: Array.from(keys).join("") })
        }
      >
        {Object.entries(data.profitModes!).map(([key, value]) => (
          <SelectItem key={key} value={key}>
            {value}
          </SelectItem>
        ))}
      </Select>
      <Input
        variant="faded"
        label={data.profitMode === "percentage" ? "收益率" : "收益額"}
        placeholder="0"
        className="w-3/5"
        type="number"
        value={
          data.profitMode === "percentage"
            ? String(data.profitPercentage)
            : String(data.profitAmount)
        }
        endContent={data.profitMode === "percentage" ? "%" : data.pairQuote}
        onChange={(e) =>
          setData({
            ...data,
            profitPercentage:
              data.profitMode === "percentage"
                ? parseFloat(e.target.value || "0")
                : data.profitPercentage,
            profitAmount:
              data.profitMode === "amount"
                ? parseFloat(e.target.value || "0")
                : data.profitAmount,
          })
        }
      />
    </div>
    <div className="flex flex-row gap-2 mt-2 items-center">
      <Input
        variant="faded"
        label="平倉價格"
        placeholder="0"
        className="w-1/2"
        type="number"
        value={String(data.closePrice)}
        onChange={(e) =>
          setData({ ...data, closePrice: parseFloat(e.target.value || "0") })
        }
      />
      <Input
        variant="faded"
        label="開倉均價"
        placeholder="0"
        className="w-1/2"
        type="number"
        value={String(data.openPrice)}
        onChange={(e) =>
          setData({ ...data, openPrice: parseFloat(e.target.value || "0") })
        }
      />
    </div>
    <div className="flex flex-row gap-2 mt-2 items-center">
      <DateInput
        variant="faded"
        label="日期"
        className="w-1/2"
        value={data.date}
        onChange={(e) => setData({ ...data, date: e })}
        suppressHydrationWarning
      />
      <TimeInput
        hideTimeZone
        hourCycle={24}
        variant="faded"
        label="時間"
        className="w-1/2"
        value={data.time}
        onChange={(e) => setData({ ...data, time: e })}
        suppressHydrationWarning
      />
    </div>
    <div className="flex flex-row gap-2 mt-2 items-center">
      <Button
        startContent={<FaUser />}
        size="lg"
        variant="faded"
        className="w-4/5 shadow-lg font-bold"
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setData({ ...data, avatar: e.target?.result as string });
              };
              reader.readAsDataURL(file);
            }
          };
          input.click();
        }}
      >
        開啟頭像
      </Button>
      <Button
        isIconOnly
        isDisabled={!data.avatar}
        startContent={<FaX />}
        color="danger"
        size="lg"
        variant="faded"
        className="w-1/5 shadow-lg font-bold"
        onClick={() => setData({ ...data, avatar: "" })}
      ></Button>
    </div>
    <div className="flex flex-row gap-2 mt-2 items-center">
      <Input
        variant="faded"
        label="使用者名稱"
        placeholder="Harvest Chives"
        className="w-1/2"
        type="text"
        spellCheck="false"
        value={data.username}
        onChange={(e) => setData({ ...data, username: e.target.value })}
      />
      <Input
        variant="faded"
        label="邀請碼"
        placeholder="VWZLJ6"
        className="w-1/2"
        type="text"
        spellCheck="false"
        value={data.referralCode}
        onChange={(e) => setData({ ...data, referralCode: e.target.value })}
      />
    </div>
  </div>
);

const BingXGenerate: React.FC<GenerateProps<BingXData>> = ({ data }) => (
  <div
    className="bg-cover bg-no-repeat bg-center bg-black"
    style={{
      // backgroundColor: "#000",
      // background: "#000",
      // backgroundRepeat: "no-repeat !important",
      // backgroundSize: "cover !important",
      height: "320px",
      position: "relative",
      width: "320px",
      fontFamily:
        "'Source Sans Pro', 'Microsoft YaHei', Inter, 'Inter Fallback', sans-serif",
      backgroundImage: `url(${
        data.profitPercentage! >= 0
          ? data.backgrounds![data.version].profit[data.style]
          : data.backgrounds![data.version].loss[data.style]
      })`,
    }}
  >
    <div
      style={{
        padding: "16px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        overflow: "hidden",
        position: "relative",
        width: "100%",
        zIndex: 1,
      }}
    >
      <div
        style={{
          height: "27px",
          width: "fit-content",
        }}
      >
        <img
          style={{
            height: "24px",
            width: "76px",
          }}
          src="./graph/bingx/logo.png"
        />
      </div>
      <div
        style={{
          textAlign: "left",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          zIndex: 3,
        }}
      >
        <span
          style={{
            marginBottom: "8px",
            display: "block",
            fontSize: "12px",
          }}
        >
          平倉收益
        </span>
        <p
          style={{
            transform: "unset !important",
            transformOrigin: "0 0",
            display: "flex",
            position: "relative",
            marginBottom: 0,
          }}
        >
          <span
            style={{
              alignItems: "center",
              display: "flex",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "14px",
              whiteSpace: "nowrap",
            }}
          >
            {data.pairStandard}
            {data.pairQuote}
          </span>
          <span
            style={{
              background: "#fff",
              margin: "0 6px",
              alignSelf: "center",
              display: "block",
              height: "12px",
              opacity: ".3",
              width: "1px",
            }}
          ></span>
          <span
            style={{
              // color: "ff006b !important",
              // color: "#00ff9d !important",
              color:
                data.style === "style1"
                  ? data.sideIsBuy
                    ? "#00ff9d"
                    : "#ff006b"
                  : data.sideIsBuy
                  ? "#ff006b"
                  : "#00ff9d",
              alignItems: "center",
              display: "flex",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "14px",
              whiteSpace: "nowrap",
            }}
          >
            {data.sideIsBuy ? "買" : "賣"}
          </span>
          <span
            style={{
              background: "#fff",
              margin: "0 6px",
              alignSelf: "center",
              display: "block",
              height: "12px",
              opacity: ".3",
              width: "1px",
            }}
          ></span>
          <span
            style={{
              alignItems: "center",
              display: "flex",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "14px",
              whiteSpace: "nowrap",
            }}
          >
            {data.leverage ?? 0}X
          </span>
        </p>
        <span
          style={{
            marginTop: "20px",
            transformOrigin: "0 0",
            transform: "scale(.7)",
            color: "#fff",
            display: "flex",
            fontSize: "16px",
            lineHeight: "12px",
            opacity: ".5",
          }}
        >
          {data.profitMode === "percentage" ? "收益率" : "收益額"}
        </span>
        <div
          className={rubik.className}
          style={{
            fontSize: "40px",
            // color: "#00ff9d !important",
            // color: "#ff006b !important",
            color:
              data.style === "style1"
                ? data.profitPercentage! >= 0
                  ? "#00ff9d"
                  : "#ff006b"
                : data.profitPercentage! >= 0
                ? "#ff006b"
                : "#00ff9d",
            fontFamily: "Rubik",
            lineHeight: "48px",
          }}
        >
          {data.profitMode === "percentage" ? (
            <span>
              <span>{data.profitPercentage}</span>%
            </span>
          ) : (
            <span
              style={{
                fontSize: "26px",
              }}
            >
              <span>{data.profitAmount}</span>
              {" " + data.pairQuote}
            </span>
          )}
        </div>
        <ul
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            marginBottom: 0,
            paddingInlineStart: 0,
          }}
        >
          <li
            style={{
              textAlign: "left",
              transformOrigin: "0 0",
              transform: "scale(.7)",
              color: "#fff",
              display: "flex",
              flexDirection: "row",
              fontSize: "16px",
              fontStyle: "normal",
              lineHeight: "15px",
              marginBottom: 0,
              paddingInlineStart: 0,
            }}
          >
            <p
              style={{
                width: "78.3013px",
                lineHeight: "20px",
                opacity: ".5",
                whiteSpace: "nowrap",
                marginBottom: 0,
              }}
            >
              <span>平倉價格</span>
            </p>
            <p
              style={{
                flexGrow: 1,
                lineHeight: "20px",
                whiteSpace: "nowrap",
                marginBottom: 0,
                fontFamily:
                  "Yantramanav,Inter,'Inter Fallback',system-ui,sans-serif",
              }}
            >
              {formatNumber(data.closePrice)}
            </p>
          </li>
          <li
            style={{
              textAlign: "left",
              transformOrigin: "0 0",
              transform: "scale(.7)",
              color: "#fff",
              display: "flex",
              flexDirection: "row",
              fontSize: "16px",
              fontStyle: "normal",
              lineHeight: "15px",
              marginBottom: 0,
              paddingInlineStart: 0,
            }}
          >
            <p
              style={{
                width: "78.3013px",
                lineHeight: "20px",
                opacity: ".5",
                whiteSpace: "nowrap",
                marginBottom: 0,
              }}
            >
              <span>開倉均價</span>
            </p>
            <p
              style={{
                flexGrow: 1,
                lineHeight: "20px",
                whiteSpace: "nowrap",
                marginBottom: 0,
                fontFamily:
                  "Yantramanav,Inter,'Inter Fallback',system-ui,sans-serif",
              }}
            >
              {formatNumber(data.openPrice)}
            </p>
          </li>
        </ul>
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            alignItems: "flex-end",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              placeItems: "center center",
            }}
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
                height: "39px",
                justifyContent: "center",
                overflow: "hidden",
                width: "39px",
              }}
            >
              <div
                style={{
                  width: "39px",
                  height: "39px",
                  alignItems: "center",
                  boxSizing: "border-box",
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  style={{
                    borderRadius: "50%",
                    height: "70%",
                    objectFit: "cover",
                    width: "70%",
                  }}
                  src={data.avatar || "./graph/bingx/avatar.jpg"}
                />
              </div>
            </div>
            <div
              style={{
                marginLeft: "5px",
                textAlign: "left",
                paddingTop: "1px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  transformOrigin: "0 0",
                  transform: "scale(.95)",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: "15px",
                  maxWidth: "100px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginBottom: 0,
                }}
              >
                {data.username}
              </p>
              <p
                style={{
                  transformOrigin: "0 0",
                  transform: "scale(.7) translateY(4px)",
                  color: "#fff9",
                  fontSize: "16px",
                  lineHeight: "10px",
                  maxWidth: "150px",
                  minWidth: "100px",
                  marginBottom: 0,
                  fontFamily:
                    "Yantramanav,Inter,'Inter Fallback',system-ui,sans-serif",
                }}
                suppressHydrationWarning
              >
                {`${
                  data.date
                    ? formatDate(data.date?.toDate(getLocalTimeZone()), "MM/dd")
                    : "--/--"
                } ${
                  data.time ? String(data.time.hour).padStart(2, "0") : "--"
                }:${
                  data.time ? String(data.time.minute).padStart(2, "0") : "--"
                }`}
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            alignItems: "flex-end",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              textAlign: "right",
              marginRight: "6px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                transformOrigin: "100% 100%",
                textOverflow: "ellipsis",
                transform: "scale(.95)",
                color: "#fff9",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "16px",
                maxWidth: "120px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                marginBottom: 0,
              }}
            >
              邀請碼
            </p>
            <p
              style={{
                transformOrigin: "100% 100%",
                transform: "translateY(2px)",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "16px",
                maxWidth: "120px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                marginBottom: 0,
                fontFamily:
                  "Yantramanav,Inter,'Inter Fallback',system-ui,sans-serif",
              }}
            >
              {data.referralCode}
            </p>
          </div>
          <div
            style={{
              height: "29px",
              width: "29px",
            }}
          >
            <img
              style={{
                width: "100%",
              }}
              src={`https://quickchart.io/qr?text=${encodeURIComponent(
                `https://bingx.com/invite/${data.referralCode}?ch=share_poster_position`
              )}&margin=2`}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export { defaultBingXData, BingXOption };
export type { BingXData };
