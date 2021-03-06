import React from "react";
import { Text, TextProps } from "@chakra-ui/react";

interface ChannelNameProps {
  name: string;
}

const ChannelName: React.FC<ChannelNameProps & TextProps> = ({
  name,
  ...props
}) => {
  return (
    <Text fontSize="lg" fontWeight="semibold" {...props}>
      {name}
    </Text>
  );
};

export default ChannelName;
