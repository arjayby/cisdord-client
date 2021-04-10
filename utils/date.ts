import { formatRelative } from "date-fns";
import { enUS } from "date-fns/locale";

const formatRelativeLocale = {
  lastWeek: "cccc",
  yesterday: "'Yesterday'",
  today: "'Today'",
  tomorrow: "'Tomorrow'",
  nextWeek: "cccc",
  other: "MMMM d, yyyy",
};

export const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const locale: Locale = {
  ...enUS,
  formatRelative: (token) => formatRelativeLocale[token],
};

export const getDayName = (dateString: string) => {
  const format = formatRelative(new Date(dateString), new Date(), { locale });

  if (week.includes(format)) {
    return format.substring(0, 3);
  }

  return format;
};
