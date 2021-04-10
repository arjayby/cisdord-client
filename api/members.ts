import api from "api";
import { FindMembersReponseType } from "types/apiResponse";

export const getMembersByUserId = async (
  userId: number,
  options?: {
    limit?: number;
  }
): Promise<FindMembersReponseType> => {
  const { limit = 10 } = options || {};

  const members = await api.members.find({
    query: {
      $limit: limit,
      $sort: {
        createdAt: -1,
      },
      userId,
    },
  });

  return members;
};

export const getMembersByChannelId = async (
  channelId: number,
  options?: {
    limit?: number;
  }
): Promise<FindMembersReponseType> => {
  const { limit = 10 } = options || {};

  const members = await api.members.find({
    query: {
      $limit: limit,
      $sort: {
        createdAt: -1,
      },
      channelId,
    },
  });

  return members;
};
