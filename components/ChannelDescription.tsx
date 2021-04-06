import React from "react";
import { Text, TextProps } from "@chakra-ui/react";

interface ChannelDescriptionProps {
  description: string;
}

const ChannelDescription: React.FC<ChannelDescriptionProps & TextProps> = ({
  description,
  ...props
}) => {
  return (
    <Text color="gray.600" fontSize="sm" {...props}>
      {description}
    </Text>
  );
};

export default ChannelDescription;
