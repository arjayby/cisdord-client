import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { MessageType } from "types/message";

const formatRelativeLocale = {
  lastWeek: "'Last' eeee",
  yesterday: "'Yesterday'",
  today: "'Today'",
  tomorrow: "'Tomorrow'",
  nextWeek: "eeee",
  other: "MMMM d, yyyy",
};

export const locale: Locale = {
  ...enUS,
  formatRelative: (token) => formatRelativeLocale[token],
};

export const groupMessages = (
  messages: MessageType[],
  groupBy: "date" | "time"
) => {
  let formatStr;

  if (groupBy === "date") {
    formatStr = "MMMM d, yyyy";
  }
  if (groupBy === "time") {
    formatStr = "h:mm aa";
  }

  return messages.reduce((accu, curr) => {
    const day = format(new Date(curr.createdAt), formatStr);

    if (!accu[day]) {
      accu[day] = [];
    }

    accu[day].push(curr);

    return accu;
  }, {});
};
