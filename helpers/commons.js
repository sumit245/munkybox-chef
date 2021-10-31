import moment from "moment";

export const nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
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

export const showcurrendate = () => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date().getDate();
  let month = new Date().getMonth();
  let day = new Date().getDay();
  return date + nth(date) + " " + months[month] + " | " + days[day];
};

export const onDateChange = (date, diff) => {
  var a = moment(date);
  let b = a.add(diff, "days");
  let start = date.format("DD MMM, YYYY");
  let end = b.format("DD MMM, YYYY");
  return { start, end };
};
