import { format } from "date-fns";
import { MessageType } from "types/message";

export const groupMessages = (
  messages: MessageType[],
  groupBy: "date" | "time"
) => {
  let formatStr;

  if (groupBy === "date") {
    formatStr = "MMMM d, yyyy";
  }
  if (groupBy === "time") {
    formatStr = "h:m aa";
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
