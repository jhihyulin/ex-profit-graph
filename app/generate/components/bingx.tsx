import { FormProps, GenerateProps } from "../props";

interface BingXData {
  pairStandard: string;
  pairQuote: string;
  sideIsBuy: boolean;
}

const defaultBingXData: BingXData = {
  pairStandard: "BTC",
  pairQuote: "USDT",
  sideIsBuy: true,
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
      <input
        className="p-2 bg-blue border rounded text-black w-20"
        type="text"
        value={data.pairStandard}
        onChange={(e) => setData({ ...data, pairStandard: e.target.value })}
      />
      <input
        className="p-2 bg-blue border rounded text-black w-20"
        type="text"
        value={data.pairQuote}
        onChange={(e) => setData({ ...data, pairQuote: e.target.value })}
      />
    </div>
    <div className="flex flex-row gap-4 mt-4">
      <button
        className={`p-2 border rounded ${
          data.sideIsBuy ? "bg-green-500" : "bg-red-500"
        } text-white`}
        onClick={() => setData({ ...data, sideIsBuy: !data.sideIsBuy })}
      >
        {data.sideIsBuy ? "Buy" : "Sell"}
      </button>
    </div>
  </div>
);

const BingXGenerate: React.FC<GenerateProps<BingXData>> = ({ data }) => (
  <div className="flex flex-col">
    <p>Pair Standard: {data.pairStandard}</p>
    <p>Pair Quote: {data.pairQuote}</p>
    <p>Side: {data.sideIsBuy ? "Buy" : "Sell"}</p>
  </div>
);

export { defaultBingXData, BingXOption };
export type { BingXData };
