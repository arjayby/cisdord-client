import api from "api";
import { FindChannelsResponseType } from "types/apiResponse";
import { getMembersByUserId } from "./members";

export const getChannelsByUserId = async (
  userId: number,
  options?: {
    limit?: number;
  }
): Promise<FindChannelsResponseType> => {
  const { limit = 10 } = options || {};

  const members = await getMembersByUserId(userId);

  const channels = await api.channels.find({
    query: {
      $limit: limit,
      id: {
        $in: members.data.map((member) => member.channelId),
      },
    },
  });

  return channels;
};
