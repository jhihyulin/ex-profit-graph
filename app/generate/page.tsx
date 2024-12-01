"use client";

import { useState } from "react";
// import { TestData, defaultTestData, TestOption } from "./components/test";
import { BingXData, defaultBingXData, BingXOption } from "./components/bingx";
import domtoimage from "dom-to-image";

export default function Generate() {
  const [formType, setFormType] = useState<string>("bingx");
  const [bingXData, setBingXData] = useState<BingXData>(defaultBingXData);
  // const [testData, setTestData] = useState<TestData>(defaultTestData);
  const formTypeSelections = [
    BingXOption(bingXData, setBingXData),
    // TestOption(testData, setTestData),
  ];

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen p-4 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-wrap gap-8 items-center justify-center w-full">
        <div className="flex flex-col justify-center items-center bg-gray-600 p-4 rounded-md w-full lg:w-3/5 max-w-sm gap-4 aspect-square">
          {formTypeSelections.map((selection) =>
            formType === selection.value ? (
              <div key={selection.value} id="generate">
                {selection.generate}
              </div>
            ) : null
          )}
          <button
            className="items-center gap-2 px-4 py-2 text-lg font-bold text-white rounded-md bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              const node = document.getElementById("generate") as HTMLElement;
              const selected = formTypeSelections.find(
                (selection) => selection.value === formType
              );
              const scale = selected ? selected.scale : 1;
              domtoimage
                .toPng(node, {
                  width: node.clientWidth * scale,
                  height: node.clientHeight * scale,
                  style: {
                    transform: "scale(" + scale + ")",
                    transformOrigin: "top left",
                  },
                })
                .then((dataUrl: string) => {
                  const link = document.createElement("a");
                  link.download = selected
                    ? selected.value + ".png"
                    : "generate.png";
                  link.href = dataUrl;
                  link.click();
                });
            }}
          >
            下載圖片
          </button>
        </div>
        <div className="flex flex-col gap-4 justify-left bg-gray-600 p-4 justify-center rounded-md w-full lg:w-2/5 max-w-sm">
          <select
            className="p-2 bg-blue border rounded color-black text-black"
            value={formType}
            onChange={(e) => {
              const selected = formTypeSelections.find(
                (selection) => selection.value === e.target.value
              );
              setFormType(selected ? selected.value : "");
            }}
          >
            {formTypeSelections.map((selection) => (
              <option key={selection.value} value={selection.value}>
                {selection.name}
              </option>
            ))}
          </select>
          {formTypeSelections.map((selection) =>
            formType === selection.value ? (
              <div key={selection.value}>{selection.form}</div>
            ) : null
          )}
        </div>
      </main>
    </div>
  );
}
