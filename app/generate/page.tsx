"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import { FaDownload } from "react-icons/fa6";
import domtoimage from "dom-to-image";

// import { TestData, defaultTestData, TestOption } from "./components/test";
import { BingXData, defaultBingXData, BingXOption } from "./components/bingx";

export default function Generate() {
  const [formType, setFormType] = useState<string>("bingx");
  const [bingXData, setBingXData] = useState<BingXData>(defaultBingXData);
  // const [testData, setTestData] = useState<TestData>(defaultTestData);
  const formTypeSelections = [
    BingXOption(bingXData, setBingXData),
    // TestOption(testData, setTestData),
  ];
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  return (
    <div className="flex items-center justify-items-center min-h-screen p-4 sm:p-8">
      <div className="flex flex-wrap items-center justify-center w-full gap-4 sm:gap-8">
        <Card>
          <CardBody className="flex flex-col gap-2 justify-center">
            {formTypeSelections.map((selection) =>
              formType === selection.value ? (
                <div key={selection.value} id="generate">
                  {selection.generate}
                </div>
              ) : null
            )}
            <Button
              variant="faded"
              startContent={isSaveLoading ? null : <FaDownload />}
              isLoading={isSaveLoading}
              onPress={() => {
                setIsSaveLoading(true);
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
                    setIsSaveLoading(false);
                  });
              }}
            >
              下載圖片
            </Button>
          </CardBody>
        </Card>
        <Card className="w-full lg:w-2/5 max-w-sm gap-4">
          <CardBody className="flex flex-col gap-2 justify-center">
            <Select
              disallowEmptySelection
              variant="faded"
              label="交易所"
              placeholder="選擇交易所"
              selectedKeys={[formType]}
              value={formType}
              onSelectionChange={(keys) =>
                setFormType(Array.from(keys).join(""))
              }
            >
              {formTypeSelections.map((selection) => (
                <SelectItem key={selection.value} value={selection.value}>
                  {selection.name}
                </SelectItem>
              ))}
            </Select>
            {formTypeSelections.map((selection) =>
              formType === selection.value ? (
                <div key={selection.value}>{selection.form}</div>
              ) : null
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
