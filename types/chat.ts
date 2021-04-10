import { ChannelType } from "./channel";
import { MessageType } from "./message";
import { UserType } from "./user";

export type ChatType = {
  channel: ChannelType;
  messages: MessageType[];
  users: UserType[];
};
