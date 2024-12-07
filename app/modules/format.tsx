export const formatDate = (
  date: Date,
  format = "yyyy-MM-dd HH:mm:ss"
): string => {
  // This from https://juejin.cn/post/7210375037114974264
  // Then modified
  // yyyy comma removal
  // output format T
  // by @jhihyulin
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const formatMap: { [key: string]: string } = {
    yyyy: year.toLocaleString().replace(",", ""),
    MM: month.toLocaleString().padStart(2, "0"),
    dd: day.toLocaleString().padStart(2, "0"),
    HH: hour.toLocaleString().padStart(2, "0"),
    mm: minute.toLocaleString().padStart(2, "0"),
    ss: second.toLocaleString().padStart(2, "0"),
    T: "T",
  };
  return format.replace(/yyyy|MM|dd|HH|mm|ss|T/g, (match) => formatMap[match]);
};

export const formatNumber = (num: number): string => {
  if (num === 0) return "0";
  const [integerPart, decimalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};
