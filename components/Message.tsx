import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { format, formatDistanceToNow } from "date-fns";
import { UserType } from "types/user";
import { MessageType } from "types/message";

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
  const isSameMessageBySameUser = previousMessage?.userId === message.userId;
  const isSameMessageTimeBySameUser =
    isSameMessageBySameUser &&
    format(new Date(previousMessage?.createdAt), "MMMM d, yyyy h:mm aa") ===
      format(new Date(message.createdAt), "MMMM d, yyyy h:mm aa");

  return (
    <Flex direction={isMe ? "row-reverse" : "row"}>
      {!isMe && (
        <Box minW="40px">
          {!isSameMessageTimeBySameUser && (
            <Popover placement="right">
              <PopoverTrigger>
                <Avatar
                  name={message.user.name}
                  size="sm"
                  _hover={{ cursor: "pointer" }}
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                  {message.user.name}{" "}
                  <Text fontSize="sm" color="gray.500">
                    @{message.user.username}
                  </Text>
                </PopoverHeader>
                <PopoverBody>
                  I was created{" "}
                  {formatDistanceToNow(new Date(message.user.createdAt), {
                    addSuffix: true,
                  })}
                  .
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </Box>
      )}
      <Flex
        maxW="80%"
        direction="column"
        align={isMe ? "flex-end" : "flex-start"}
      >
        {!isSameMessageTimeBySameUser && (
          <Text fontSize="xs" color="gray.500">
            {isMe ? "You" : message.user.name} //{" "}
            {format(new Date(message.createdAt), "h:mm aa")}
          </Text>
        )}
        <Text
          py="2"
          px="4"
          bgColor={isMe ? "brand.500" : "gray.100"}
          color={isMe ? "white" : undefined}
          borderRadius={isMe ? "24px 0 24px 24px" : "0 24px 24px 24px"}
          fontSize="sm"
        >
          {message.body}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Message;
