import React, { FormEvent, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { MdMoreHoriz } from "react-icons/md";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import ChannelName from "./ChannelName";
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
      flex={1}
      p="5"
      h="calc(100vh - 230px)"
      templateRows="auto 1fr auto"
      templateColumns="1fr"
      bg="#F9F9F9"
      rounded="lg"
    >
      <Flex justify="space-between">
        <Flex direction="column">
          <ChannelName name={channel.name} />
          <Text color="gray.500" fontSize="xs">
            {formatDistanceToNow(new Date(channel.updatedAt))}
          </Text>
        </Flex>
        <IconButton
          aria-label="More options"
          icon={<MdMoreHoriz />}
          variant="ghost"
        />
      </Flex>
      <Box overflowY="auto" my="5" flex={1}>
        <Messages user={user} messages={reversedMessages} />
      </Box>
      <Grid
        gap={3}
        templateColumns="auto 1fr auto"
        as="form"
        onSubmit={handleSendMessage}
      >
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
        <ChatInput
          ref={messageRef}
          maxRows={5}
          placeholder="Message"
          minH="40px"
          onKeyDown={handleChatInputKeyDown}
        />
        <Button colorScheme="brand" type="submit">
          Send 🕊
        </Button>
      </Grid>
    </Grid>
  );
};

export default Chat;
