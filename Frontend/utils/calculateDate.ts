import { monthsMap } from "./monthsMap";

export const calculateDate = (date : string) => {
  const newDate = new Date(date);
  const month = newDate.getMonth();
  return`${newDate.getDate()} ${monthsMap.get(month)} ${newDate.getFullYear()}`;
}