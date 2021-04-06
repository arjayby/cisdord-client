import React from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import { Avatar, Box, Button, Divider, Flex, Grid } from "@chakra-ui/react";
import Layout from "@components/Layout";
import ChannelName from "@components/ChannelName";
import ChannelDescription from "@components/ChannelDescription";
import ChannelMembers from "@components/ChannelMembers";
import ChannelTags from "@components/ChannelTags";
import { ChannelType } from "types/channel";
import api from "@api";

const Channels: React.FC<{ channels: ChannelType[] }> = ({ channels }) => {
  return (
    <Layout title="Channels | cisdord">
      <Box py="10">
        <Grid templateColumns="repeat(3, 1fr)" gap={8}>
          {channels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.channels.find({
    query: {
      $sort: {
        membersCount: -1,
      },
    },
  });

  return {
    props: {
      channels: data,
    },
    revalidate: 15,
  };
};

const ChannelCard: React.FC<{ channel: ChannelType }> = ({ channel }) => {
  return (
    <Link href={`/channels/${channel.shortId}`}>
      <Box
        as="a"
        href={`/channels/${channel.shortId}`}
        p="5"
        rounded="20px"
        boxShadow="xl"
      >
        <Flex justify="space-between" align="center">
          <Avatar size="xl" name={channel.name} />
          <ChannelMembers count={channel.membersCount} />
        </Flex>
        <Box my="5" />
        <ChannelName name={channel.name} />
        <Box my="3" />
        <ChannelDescription description={channel.description} />
        <Box my="5" />
        <ChannelTags tags={channel.tags} />
        <Box my="5" />
        <Divider />
        <Box my="5" />
        <Flex>
          <Button isFullWidth>View</Button>
          <Box mx="2" />
          <Button isFullWidth>Join</Button>
        </Flex>
      </Box>
    </Link>
  );
};

export default Channels;
