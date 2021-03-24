import React from "react";
import { useRouter } from "next/router";

const Channel: React.FC = () => {
  const router = useRouter();
  const { id: channelId } = router.query;

  return <div>{channelId}</div>;
};

export default Channel;
