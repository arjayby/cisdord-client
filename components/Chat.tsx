import React, { FormEvent, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import ChannelName from "./ChannelName";
import ChannelMembers from "./ChannelMembers";
import Messages from "./Messages";
import { formatDistanceToNow } from "date-fns";
import { UserType } from "types/user";
import { ChannelType } from "types/channel";
import { MessageType } from "types/message";
import ChatInput from "./ChatInput";

interface ChatProps {
  user: UserType;
  channel: ChannelType;
  messages: MessageType[];
  onSendMessage?: (message: string) => void;
}

const Chat: React.FC<ChatProps> = ({
  user,
  channel,
  messages,
  onSendMessage = () => {},
}) => {
  const messageRef = useRef<HTMLTextAreaElement>();

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();

    onSendMessage(messageRef.current.value);
    messageRef.current.value = "";
    messageRef.current.style.height = "40px";
  };

  const handleSendMessage = (e) => {
    sendMessage(e);
  };

  const handleChatInputKeyDown = (e) => {
    if (e.code === "Enter" && !e.shiftKey) {
      sendMessage(e);
    }
  };

  const handleSelectEmoji = (e) => {
    messageRef.current.value += e.native;
  };

  const reversedMessages = messages.slice().reverse();

  return (
    <Grid
      p="4"
      pl="-4"
      h="calc(100vh - 240px)"
      templateRows="auto 1fr auto"
      templateColumns="1fr"
      flex={1}
    >
      <Flex justify="space-between">
        <Flex direction="column">
          <ChannelName name={channel.name} />
          <Text color="gray.500" fontSize="xs">
            {formatDistanceToNow(new Date(channel.updatedAt))}
          </Text>
        </Flex>
        <ChannelMembers count={channel.membersCount} />
      </Flex>
      <Box overflowY="auto" my="5" flex={1}>
        <Messages user={user} messages={reversedMessages} />
      </Box>
      <Flex w="100%" as="form" onSubmit={handleSendMessage}>
        <ChatInput
          ml="0.5"
          mb="0.5"
          ref={messageRef}
          maxRows={5}
          placeholder="Message"
          minH="40px"
          onKeyDown={handleChatInputKeyDown}
        />
        <Box mx="2" />
        <Popover>
          <PopoverTrigger>
            <Button>😀</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <Picker onSelect={handleSelectEmoji} />
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Box mx="2" />
        <Button colorScheme="brand" type="submit">
          Send 🕊
        </Button>
      </Flex>
    </Grid>
  );
};

export default Chat;
