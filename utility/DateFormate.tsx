import { format, parseISO } from "date-fns";
const day: any = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
const months: any = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};
export function DateFormate(newDate: any, isReverseDateFormat = false) {
  const orderData = new Date(newDate?.replace(/-/g, "/"));
  const nth = function (orderData: number) {
    if (orderData > 3 && orderData < 21) return "th";
    switch (orderData % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const year = orderData.getFullYear();
  const date = orderData.getDate();
  const days = day[orderData.getDay()];
  const monthName = months[orderData.getMonth()];
  const formatted = isReverseDateFormat
    ? `${days}, ${date}${nth(date)} ${monthName} `
    : `${date}${nth(date)} ${monthName}, ${year}`;
  return formatted.toString();
}

function isValidDate(date = "") {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  return date.match(regEx) != null;
}

function displayFormattedDate(date = "") {
  if (!!date === false || !isValidDate(date)) return "";

  return format(parseISO(date), "dd/MM/yyyy");
}
function getCurrentFormattedDate() {
  const currentDate = new Date();

  // Extract year, month, and day
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Format the date as yyyy-mm-dd
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function getLogDate(data: string) {
  const date = new Date(data);
  const monthName = months[date.getMonth()];
  return `${date.getDate()} ${monthName} ${date.getFullYear()}`;
}

export { displayFormattedDate, getLogDate, getCurrentFormattedDate };
