import { FormProps, GenerateProps } from "../props";

interface TestData {
  test1: string;
  test2: string;
}

const defaultTestData: TestData = {
  test1: "Test 1",
  test2: "Test 2",
};

function TestOption(
  data: TestData,
  setData: React.Dispatch<React.SetStateAction<TestData>>
) {
  return {
    name: "Test",
    value: "test",
    data: data,
    form: <TestForm data={data} setData={setData} />,
    generate: <TestGenerate data={data} />,
  };
}

const TestForm: React.FC<FormProps<TestData>> = ({ data, setData }) => (
  <div>
    <div className="flex flex-col gap-4">
      <input
        className="p-2 bg-blue border rounded text-black"
        type="text"
        value={data.test1}
        onChange={(e) => setData({ ...data, test1: e.target.value })}
        placeholder="Test 1"
      />
      <input
        className="p-2 bg-blue border rounded text-black"
        type="text"
        value={data.test2}
        onChange={(e) => setData({ ...data, test2: e.target.value })}
        placeholder="Test 2"
      />
    </div>
  </div>
);

const TestGenerate: React.FC<GenerateProps<TestData>> = ({ data }) => (
  <div className="flex flex-col">
    <p>Test 1: {data.test1}</p>
    <p>Test 2: {data.test2}</p>
  </div>
);

export { defaultTestData, TestOption };
export type { TestData };
