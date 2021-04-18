import { formatRelative } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatRelativeLocale = {
  lastWeek: "cccc",
  yesterday: "'Yesterday'",
  today: "'Today'",
  tomorrow: "'Tomorrow'",
  nextWeek: "cccc",
  other: "MMMM d, yyyy",
};

export const formatRelativeLocaleShortDate = {
  lastWeek: "cccc",
  yesterday: "cccc",
  today: "'Today'",
  tomorrow: "cccc",
  nextWeek: "cccc",
  other: "M/d/yy",
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

export const formatToShortDate = (dateString: string) => {
  const locale: Locale = {
    ...enUS,
    formatRelative: (token) => formatRelativeLocaleShortDate[token],
  };

  const format = formatRelative(new Date(dateString), new Date(), { locale });

  if (week.includes(format)) {
    return format.substring(0, 3);
  }

  return format;
};
