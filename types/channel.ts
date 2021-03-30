export type ChannelType = {
  id: number;
  shortId: string;
  userId: string;
  name: string;
  description: string;
  tags: string[];
  membersCount: number;
  createdAt: Date;
  updatedAt: Date;
};
