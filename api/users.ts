import api from "api";
import { FindUsersReponseType } from "types/apiResponse";
import { getMembersByChannelId } from "./members";

export const getUsersByChannelId = async (
  channelId: number,
  options?: { limit?: number }
): Promise<FindUsersReponseType> => {
  const { limit = 10 } = options || {};

  const members = await getMembersByChannelId(channelId);

  const users = await api.users.find({
    $limit: limit,
    $sort: {
      createdAt: -1,
    },
    id: {
      $in: members.data.map((member) => member.userId),
    },
  });

  return users;
};
