import { ChannelType } from "./channel";
import { MemberType } from "./member";
import { MessageType } from "./message";
import { UserType } from "./user";

export type FindReponseType = {
  total: number;
  limit: number;
  skip: number;
};

export type FindUsersReponseType = FindReponseType & {
  data: UserType[];
};

export type FindChannelsResponseType = FindReponseType & {
  data: ChannelType[];
};

export type FindMembersReponseType = FindReponseType & {
  data: MemberType[];
};

export type FindMessagesResponseType = FindReponseType & {
  data: MessageType[];
};
