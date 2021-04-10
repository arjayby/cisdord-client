import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import Layout from "@components/Layout";
import Chat from "@components/Chat";
import ChannelName from "@components/ChannelName";
import ChannelDescription from "@components/ChannelDescription";
import withAuth from "@components/withAuth";
import { MdSearch } from "react-icons/md";
import { useAuthContext } from "contexts/AuthContext";
import { useChatsContext } from "contexts/ChatsContext";
import { ChatType } from "types/chat";
import { getDayName } from "utils/date";
import { createMessage } from "api/messages";

const Me: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { chats } = useChatsContext();

  const [selectedChat, setSelectedChat] = useState<ChatType>();

  const setSelectedChannelFromRouterQuery = () => {
    const c = router.query.c as string;
    const chat = chats.find((chat) => chat.channel.shortId === c);
    setSelectedChat(chat);
  };

  useEffect(() => {
    if (router.query.c) {
      setSelectedChannelFromRouterQuery();
    } else {
      setSelectedChat(undefined);
    }
  }, [router.query.c, chats]);

  const handleRoutePushToChannels = (shortId: string) => {
    if (selectedChat?.channel?.shortId !== shortId) {
      router.push(`/channels/me?c=${shortId}`);
    }
  };

  const handleSendMessage = async (message: string) => {
    try {
      createMessage(selectedChat.channel.id, message);
    } catch (e) {
      console.error("Send message failed 😠", e);
    }
  };

  return (
    <Layout title="cisdord">
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Box py="10" h="100%">
        <Flex h="inherit">
          <Box w="320px">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon color="gray.300" as={MdSearch} fontSize="xl" />}
              />
              <Input type="search" variant="filled" placeholder="Search" />
            </InputGroup>
            <Box my="7" />
            <Grid gap={3}>
              {chats.map(({ channel, messages }) => (
                <Box
                  key={`channel-${channel.id}`}
                  as="button"
                  onClick={() => handleRoutePushToChannels(channel.shortId)}
                  p="5"
                  bg={
                    channel.id === selectedChat?.channel?.id
                      ? "brand.50"
                      : "#f9f9f9"
                  }
                  rounded="lg"
                >
                  <Flex>
                    <Avatar name={channel.name} />
                    <Box mx="2" />
                    <Flex flex={1} direction="column">
                      <Flex justify="space-between">
                        <ChannelName
                          name={channel.name}
                          fontSize="md"
                          fontWeight="semibold"
                          maxWidth="160px"
                          isTruncated
                        />
                        <Box mx="2" />
                        <Text fontSize="xs" color="gray.500" isTruncated>
                          {getDayName(channel.updatedAt)}
                        </Text>
                      </Flex>
                      <Box my="0.5" />
                      <ChannelDescription
                        description={messages[0]?.body}
                        textAlign="start"
                        fontSize="sm"
                        isTruncated
                        maxW="180px"
                      />
                    </Flex>
                  </Flex>
                </Box>
              ))}
              <Button colorScheme="brand">Create 📻</Button>
            </Grid>
          </Box>
          <Box mx="2" />
          <Box flex={1}>
            {selectedChat ? (
              <Chat
                user={user}
                channel={selectedChat.channel}
                messages={selectedChat.messages}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <Grid h="100%" placeItems="center">
                <Text>
                  {chats.length > 0
                    ? "Select a channel to open conversation"
                    : "Join the other channel or create your own"}
                </Text>
              </Grid>
            )}
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
};

export default withAuth(Me);
