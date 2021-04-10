import { ChannelType } from "./channel";
import { UserType } from "./user";

export type MemberType = {
  id: number;
  userId: number;
  user?: UserType;
  channelId: number;
  channel?: ChannelType;
  createdAt: string;
  updatedAt: string;
};
