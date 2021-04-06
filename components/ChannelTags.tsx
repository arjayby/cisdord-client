import React from "react";
import { Badge, Flex } from "@chakra-ui/react";

interface ChannelTagsProps {
  tags: string[];
}

const ChannelTags: React.FC<ChannelTagsProps> = ({ tags }) => {
  return (
    <Flex m="-2" wrap="wrap">
      {tags.map((tag) => (
        <Badge
          key={`tag-${tag}`}
          m="2"
          py="1"
          px="3"
          variant="solid"
          colorScheme="brand"
          rounded="full"
        >
          {tag}
        </Badge>
      ))}
    </Flex>
  );
};

export default ChannelTags;
