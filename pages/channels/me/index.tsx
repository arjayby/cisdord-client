import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Center, Divider, Flex, Text } from "@chakra-ui/react";
import Layout from "@components/Layout";
import UserChannels from "@components/UserChannels";
import Chat from "@components/Chat";
import withAuth from "@components/withAuth";
import { useAuthContext } from "contexts/AuthContext";
import { ChannelType } from "types/channel";
import { MessageType } from "types/message";
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
      <Box py="10" h="100%">
        <Flex h="inherit">
          <UserChannels
            channels={channels}
            selectedChannel={selectedChannel}
            onClickChannel={handleRoutePushToChannels}
          />
          <Divider orientation="vertical" mx="4" />
          <Center w="100%">
            {selectedChannel ? (
              <Chat
                user={user}
                channel={selectedChannel}
                messages={selectedChannelMessages}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <Flex direction="column" textAlign="center">
                <Text>
                  {channels.length > 0
                    ? "Select a channel to open conversation"
                    : "Join the other channel or create your own"}
                </Text>
              </Flex>
            )}
          </Center>
        </Flex>
      </Box>
    </Layout>
  );
};

export default withAuth(Me);
