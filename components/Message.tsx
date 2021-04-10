import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { UserType } from "types/user";
import { MessageType } from "types/message";
import PopoverAvatar from "./PopoverAvatar";

interface MessageProps {
  user: UserType;
  message: MessageType;
  previousMessage?: MessageType;
}

const Message: React.FC<MessageProps> = ({
  user,
  message,
  previousMessage = {},
}) => {
  const isMe = user.id === message.userId;
  const isSameUserMessage = previousMessage?.userId === message.userId;
  const isSameTimeMessage =
    previousMessage.createdAt &&
    format(new Date(previousMessage.createdAt), "MMMM d, yyyy h:mm aa") ===
      format(new Date(message.createdAt), "MMMM d, yyyy h:mm aa");
  const isSameUserAndTimeMessage = isSameUserMessage && isSameTimeMessage;

  return (
    <Flex direction={isMe ? "row-reverse" : "row"} alignItems="flex-end">
      {!isSameUserAndTimeMessage ? (
        <PopoverAvatar user={message.user} />
      ) : (
        <Box minW="48px" />
      )}
      <Box mx="1" />
      <Flex direction="column" align={isMe ? "flex-end" : "flex-start"}>
        <Box py="2" px="3" rounded="lg" bg={isMe ? "#F0F1F2" : "white"}>
          <Flex direction="column">
            {!isSameUserAndTimeMessage && (
              <Flex justify="space-between" align="center">
                <Text fontSize="sm" fontWeight="semibold">
                  {isMe ? "You" : message.user.name}
                </Text>
                <Box mx="3" />
                <Text fontSize="xs" color="gray.500">
                  {format(new Date(message.createdAt), "h:mm aa")}
                </Text>
              </Flex>
            )}
            <Box my="0.5" />
            <Text fontSize="sm">{message.body}</Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Message;
