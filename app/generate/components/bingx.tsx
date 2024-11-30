import { FormProps, GenerateProps } from "../props";
import { formatDate, formatNumber } from "../../modules/format";
import { Rubik } from "next/font/google";

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
  time: string;
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
  time: formatDate(new Date(), "yyyy/MM/dd HH:mm"),
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
    <div className="flex flex-row gap-4">
      <select
        className="p-2 bg-blue border rounded text-black w-1/2"
        value={data.version}
        onChange={(e) => setData({ ...data, version: e.target.value })}
      >
        {Object.entries(data.versions!).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <select
        className="p-2 bg-blue border rounded text-black w-1/2"
        value={data.style}
        onChange={(e) => setData({ ...data, style: e.target.value })}
      >
        {Object.entries(data.styles!).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
    <div className="flex flex-row gap-4 mt-4">
      <button
        className={`p-2 border rounded ${
          data.style === "style1"
            ? data.sideIsBuy
              ? "bg-green-500"
              : "bg-red-500"
            : data.sideIsBuy
            ? "bg-red-500"
            : "bg-green-500"
        } text-white w-1/3`}
        onClick={() => setData({ ...data, sideIsBuy: !data.sideIsBuy })}
      >
        {data.sideIsBuy ? "買" : "賣"}
      </button>
      <input
        className="p-2 bg-blue border rounded text-black w-1/3"
        type="text"
        value={data.pairStandard}
        onChange={(e) => setData({ ...data, pairStandard: e.target.value })}
      />
      <input
        className="p-2 bg-blue border rounded text-black w-1/3"
        type="text"
        value={data.pairQuote}
        onChange={(e) => setData({ ...data, pairQuote: e.target.value })}
      />
    </div>
    <div className="flex flex-row gap-4 mt-4">
      <select
        className="p-2 bg-blue border rounded text-black w-1/2"
        value={data.tradeMode}
        onChange={(e) => setData({ ...data, tradeMode: e.target.value })}
      >
        {Object.entries(data.tradeModes!).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <input
        className="p-2 bg-blue border rounded text-black w-1/2"
        type="number"
        value={data.leverage}
        onChange={(e) =>
          setData({ ...data, leverage: parseInt(e.target.value) })
        }
      />
    </div>
    <div className="flex flex-row gap-4 mt-4">
      <select
        className="p-2 bg-blue border rounded text-black w-2/5"
        value={data.profitMode}
        onChange={(e) => setData({ ...data, profitMode: e.target.value })}
      >
        {Object.entries(data.profitModes!).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <input
        className="p-2 bg-blue border rounded text-black w-3/5"
        type="number"
        value={
          data.profitMode === "percentage"
            ? data.profitPercentage
            : data.profitAmount
        }
        onChange={(e) =>
          setData({
            ...data,
            profitPercentage:
              data.profitMode === "percentage"
                ? parseFloat(e.target.value)
                : data.profitPercentage,
            profitAmount:
              data.profitMode === "amount"
                ? parseFloat(e.target.value)
                : data.profitAmount,
          })
        }
      />
    </div>
    <div className="flex flex-row gap-4 mt-4">
      <input
        className="p-2 bg-blue border rounded text-black w-1/2"
        type="number"
        value={data.closePrice}
        onChange={(e) =>
          setData({ ...data, closePrice: parseFloat(e.target.value) })
        }
      />
      <input
        className="p-2 bg-blue border rounded text-black w-1/2"
        type="number"
        value={data.openPrice}
        onChange={(e) =>
          setData({ ...data, openPrice: parseFloat(e.target.value) })
        }
      />
    </div>
    <div className="flex flex-row gap-4 mt-4">
      <input
        className="p-2 bg-blue border rounded text-black w-full"
        type="datetime-local"
        value={data.time}
        onChange={(e) => setData({ ...data, time: e.target.value })}
      />
    </div>
    <div className="flex flex-row gap-4 mt-4">
      <button
        className="p-2 bg-blue border rounded w-full"
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
      </button>
    </div>
    <div className="flex flex-row gap-4 mt-4">
      <input
        className="p-2 bg-blue border rounded text-black w-1/2"
        type="text"
        value={data.username}
        onChange={(e) => setData({ ...data, username: e.target.value })}
      />
      <input
        className="p-2 bg-blue border rounded text-black w-1/2"
        type="text"
        value={data.referralCode}
        onChange={(e) => setData({ ...data, referralCode: e.target.value })}
      />
    </div>
  </div>
);

const BingXGenerate: React.FC<GenerateProps<BingXData>> = ({ data }) => (
  <div
    style={{
      backgroundColor: "#000",
      background: "#000",
      backgroundRepeat: "no-repeat !important",
      backgroundSize: "cover !important",
      height: "320px",
      position: "relative",
      width: "320px",
      fontFamily:
        "'Source Sans Pro', 'Microsoft YaHei', Inter, 'Inter Fallback', sans-serif",
      backgroundImage:
        data.profitPercentage! >= 0
          ? `url(${data.backgrounds![data.version].profit[data.style]})`
          : `url(${data.backgrounds![data.version].loss[data.style]})`,
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
                }}
              >
                {data.time
                  ? formatDate(new Date(data.time), "MM/dd HH:mm")
                  : ""}
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
              )}`}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export { defaultBingXData, BingXOption };
export type { BingXData };
