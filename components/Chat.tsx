import React, { FormEvent, useRef } from "react";
import { Box, Button, Flex, Icon, Text, Textarea } from "@chakra-ui/react";
import { BsFillPeopleFill } from "react-icons/bs";
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
            <Text fontSize="xl">{channel.name}</Text>
            <Text color="gray.500" fontSize="xs">
              {formatDistanceToNow(new Date(channel.updatedAt))}
            </Text>
          </Flex>
          <Flex align="center">
            <Icon as={BsFillPeopleFill} color="brand.500" />
            <Text ml="4" fontWeight="600">
              {channel.membersCount}
            </Text>
          </Flex>
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
