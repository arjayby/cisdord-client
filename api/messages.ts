import api from "api";
import { FindMessagesResponseType } from "types/apiResponse";

export const getMessagesByChannelId = async (
  channelId: number,
  options?: {
    limit?: number;
  }
): Promise<FindMessagesResponseType> => {
  const { limit = 10 } = options || {};

  const messages = await api.messages.find({
    query: {
      $limit: limit,
      $sort: {
        createdAt: -1,
      },
      channelId,
      include: true,
    },
  });

  return messages;
};
