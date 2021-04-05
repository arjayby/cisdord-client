import { UserType } from "./user";

export type MessageType = {
  id: number;
  body: string;
  channelId: number;
  userId: number;
  user: UserType;
  createdAt: string;
  updatedAt: string;
};
