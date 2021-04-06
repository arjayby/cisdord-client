import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { BsFillPeopleFill } from "react-icons/bs";

interface ChannelMembersProps {
  count: number;
}

const ChannelMembers: React.FC<ChannelMembersProps> = ({ count }) => {
  return (
    <Flex align="center">
      <Icon as={BsFillPeopleFill} color="brand.500" />
      <Text ml="3">{count}</Text>
    </Flex>
  );
};

export default ChannelMembers;
