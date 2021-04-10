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
import { ChannelType } from "types/channel";
import { MessageType } from "types/message";
import { formatRelative } from "date-fns";
import { locale } from "utils";
import api from "@api";

const Me: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>();
  const [selectedChannelMessages, setSelectedChannelMessages] = useState<
    MessageType[]
  >([]);

  const getUserChannels = async () => {
    const members = await api.members.find({
      query: {
        userId: user.id,
      },
    });

    const channels = await api.channels.find({
      query: {
        id: {
          $in: members.data.map((member) => member.channelId),
        },
      },
    });

    setChannels(channels.data);
  };

  const getChannelMessages = async () => {
    const data = await api.messages.find({
      query: {
        $sort: {
          createdAt: -1,
        },
        channelId: selectedChannel.id,
        include: true,
      },
    });
    setSelectedChannelMessages(data.data);
  };

  const setSelectedChannelFromRouterQuery = () => {
    const c = router.query.c as string;
    const channel = channels.find((channel) => channel.shortId === c);
    setSelectedChannel(channel);
  };

  useEffect(() => {
    getUserChannels();
  }, []);

  useEffect(() => {
    if (selectedChannel) {
      getChannelMessages();
    }
  }, [selectedChannel]);

  useEffect(() => {
    if (router.query.c) {
      setSelectedChannelFromRouterQuery();
    } else {
      setSelectedChannel(undefined);
    }
  }, [channels, router.query.c]);

  useEffect(() => {
    api.messages.on("created", (message) => {
      setSelectedChannelMessages((prev) => [message, ...prev]);
    });

    return () => {
      api.messages.removeListener("created");
    };
  }, []);

  const handleRoutePushToChannels = (shortId: string) => {
    if (selectedChannel?.shortId !== shortId) {
      router.push(`/channels/me?c=${shortId}`);
    }
  };

  const handleSendMessage = async (message: string) => {
    try {
      await api.messages.create({
        channelId: selectedChannel.id,
        body: message,
      });
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
              {channels.map((channel) => (
                <Box
                  key={`channel-${channel.id}`}
                  as="button"
                  onClick={() => handleRoutePushToChannels(channel.shortId)}
                  p="5"
                  bg={
                    channel.id === selectedChannel.id ? "brand.50" : "#f9f9f9"
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
                          {formatRelative(
                            new Date(channel.updatedAt),
                            new Date(),
                            { locale }
                          )}
                        </Text>
                      </Flex>
                      <Box my="0.5" />
                      <ChannelDescription
                        description={channel.description}
                        isTruncated
                        fontSize="sm"
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
            {selectedChannel ? (
              <Chat
                user={user}
                channel={selectedChannel}
                messages={selectedChannelMessages}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <Grid h="100%" placeItems="center">
                <Text>
                  {channels.length > 0
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
