import { FormProps, GenerateProps } from "../../props";
import { formatDate, formatNumber } from "../../../modules/format";
// 字體 qr

interface BingXData {
  pairStandard: string;
  pairQuote: string;
  sideIsBuy: boolean;
  leverage: number;
  profitPercentage: number;
  openPrice: number;
  closePrice: number;
  time: Date;
  avatar: string;
  username: string;
  referralCode: string;
  version: string;
  versions?: string[];
  style: string;
  styles?: string[];
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
  leverage: 125,
  profitPercentage: 0,
  openPrice: 0,
  closePrice: 0,
  time: new Date(),
  avatar: "",
  username: "Harvest Chives",
  referralCode: "VWZLJ6",
  version: "v7",
  versions: ["v6", "v7"],
  style: "style1",
  styles: ["style1", "style2"],
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
    data: data,
    form: <BingXForm data={data} setData={setData} />,
    generate: <BingXGenerate data={data} />,
  };
}

const BingXForm: React.FC<FormProps<BingXData>> = ({ data, setData }) => (
  <div>
    <div className="flex flex-row gap-4">
      <select
        className="p-2 bg-blue border rounded text-black"
        value={data.version}
        onChange={(e) => setData({ ...data, version: e.target.value })}
      >
        {data.versions?.map((version) => (
          <option key={version} value={version}>
            {version}
          </option>
        ))}
      </select>
      <select
        className="p-2 bg-blue border rounded text-black"
        value={data.style}
        onChange={(e) => setData({ ...data, style: e.target.value })}
      >
        {data.styles?.map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>
    </div>
    <div className="flex flex-row gap-4 mt-4">
      <button
        className={`p-2 border rounded ${
          data.sideIsBuy ? "bg-green-500" : "bg-red-500"
        } text-white w-1/3`}
        onClick={() => setData({ ...data, sideIsBuy: !data.sideIsBuy })}
      >
        {data.sideIsBuy ? "Buy" : "Sell"}
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
      <input
        className="p-2 bg-blue border rounded text-black w-20"
        type="number"
        value={data.leverage}
        onChange={(e) =>
          setData({ ...data, leverage: parseInt(e.target.value) })
        }
      />
    </div>
    <div className="flex flex-row gap-4 mt-4">
      <input
        className="p-2 bg-blue border rounded text-black w-20"
        type="number"
        value={data.profitPercentage}
        onChange={(e) =>
          setData({ ...data, profitPercentage: parseFloat(e.target.value) })
        }
      />
    </div>
    <div className="flex flex-row gap-4 mt-4">
      <input
        className="p-2 bg-blue border rounded text-black w-20"
        type="number"
        value={data.closePrice}
        onChange={(e) =>
          setData({ ...data, closePrice: parseFloat(e.target.value) })
        }
      />
      <input
        className="p-2 bg-blue border rounded text-black w-20"
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
        value={data.time.toISOString().slice(0, 16)}
        onChange={(e) => setData({ ...data, time: new Date(e.target.value) })}
      />
    </div>
    <div className="flex flex-row gap-4 mt-4">
      <input
        className="p-2 bg-blue border rounded text-black w-20"
        type="text"
        value={data.avatar}
        onChange={(e) => setData({ ...data, avatar: e.target.value })}
      />
      <input
        className="p-2 bg-blue border rounded text-black w-20"
        type="text"
        value={data.username}
        onChange={(e) => setData({ ...data, username: e.target.value })}
      />
      <input
        className="p-2 bg-blue border rounded text-black w-20"
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
              color: data.sideIsBuy ? "#00ff9d" : "#ff006b",
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
          收益率
        </span>
        <div
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
          }}
        >
          <span>{data.profitPercentage ?? 0}%</span>
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
                {data.time ? formatDate(data.time, "MM/dd HH:mm") : ""}
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
              src="data:image/png;base64,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"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export { defaultBingXData, BingXOption };
export type { BingXData };
