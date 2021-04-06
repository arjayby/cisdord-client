import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { UserType } from "types/user";
import { MessageType } from "types/message";

interface MessageProps {
  user: UserType;
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ user, message }) => {
  const isMe = user.id === message.userId;

  return (
    <Flex direction={isMe ? "row-reverse" : "row"}>
      {!isMe && (
        <>
          <Avatar alignSelf="flex-end" name="user 2" size="sm" />
          <Box mx="1" />
        </>
      )}
      <Text
        maxW="70%"
        py="2"
        px="4"
        bgColor={isMe ? "brand.500" : "gray.100"}
        color={isMe ? "white" : undefined}
        borderRadius={isMe ? "24px 24px 0 24px" : "24px 24px 24px 0"}
        fontSize="sm"
      >
        {message.body}
      </Text>
    </Flex>
  );
};

export default Message;
