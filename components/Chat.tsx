import React, { FormEvent, useRef } from "react";
import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import ChannelName from "./ChannelName";
import ChannelMembers from "./ChannelMembers";
import Messages from "./Messages";
import { formatDistanceToNow } from "date-fns";
import { UserType } from "types/user";
import { ChannelType } from "types/channel";
import { MessageType } from "types/message";

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

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();

    onSendMessage(messageRef.current.value);
    messageRef.current.value = "";
  };

  messages.sort((a, b) => {
    return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf();
  });

  return (
    <Flex h="100%" w="100%">
      <Flex p="4" pl="-4" direction="column" flex={1}>
        <Flex justify="space-between">
          <Flex direction="column">
            <ChannelName name={channel.name} />
            <Text color="gray.500" fontSize="xs">
              {formatDistanceToNow(new Date(channel.updatedAt))}
            </Text>
          </Flex>
          <ChannelMembers count={channel.membersCount} />
        </Flex>
        <Box my="5" flex={1}>
          <Messages user={user} messages={messages} />
        </Box>
        <Flex as="form" onSubmit={handleSendMessage}>
          <Textarea
            ref={messageRef}
            placeholder="Message"
            variant="outline"
            resize="none"
            rows={1}
            maxLength={255}
            size="sm"
            mr="5"
          />
          <Button colorScheme="brand" type="submit">
            Send 🕊
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Chat;
