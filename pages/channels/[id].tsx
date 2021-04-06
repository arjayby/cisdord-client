import React from "react";
import { GetServerSideProps } from "next";
import { Avatar, Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import Layout from "@components/Layout";
import ChannelMembers from "@components/ChannelMembers";
import ChannelDescription from "@components/ChannelDescription";
import ChannelName from "@components/ChannelName";
import ChannelTags from "@components/ChannelTags";
import { ChannelType } from "types/channel";
import api from "@api";

const Channel: React.FC<{ channel: ChannelType }> = ({ channel }) => {
  return (
    <Layout title={`${channel.name}'s Channel | cisdord `}>
      <Box py="10">
        <Flex direction="column" align="center">
          <Avatar name={channel.name} size="2xl" />
          <Box my="3" />
          <ChannelMembers count={channel.membersCount} />
          <Box my="3" />
          <ChannelName name={channel.name} fontSize="2xl" />
          <Box my="2" />
          <ChannelDescription
            description={channel.description}
            textAlign="center"
          />
          <Box my="5" />
          <ChannelTags tags={channel.tags} />
          <Box my="5" />
          <Button isFullWidth maxW="350" colorScheme="brand">
            Join the channel 🤝
          </Button>
          <Box my="5" />
          <Divider />
        </Flex>
        <Box my="5">
          <Text fontSize="xl">Reviews (0)</Text>
          <Box my="5" />
          <Text fontSize="md" color="gray.600">
            No reviews yet.
          </Text>
        </Box>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await api.channels.find({
    query: {
      $limit: 1,
      shortId: context.params.id,
    },
  });

  return {
    props: {
      channel: data[0],
    },
    notFound: data.length === 0,
  };
};

export default Channel;
