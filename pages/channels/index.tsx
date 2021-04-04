import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { Badge, Box, Flex, Grid, Icon, Image, Text } from "@chakra-ui/react";
import { BsFillPeopleFill } from "react-icons/bs";
import Layout from "@components/Layout";
import api from "@api";
import { ChannelType } from "types/channel";

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
        key={channel.id}
        rounded="20px"
        boxShadow="xl"
      >
        <Flex justify="space-between" align="center">
          <ChannelAvatar src="/images/avatar.jpg" />
          <ChannelMembers count={channel.membersCount} />
        </Flex>
        <ChannelName name={channel.name} />
        <ChannelDescription description={channel.description} />
        <Flex m="-1.5" mt="10" wrap="wrap">
          {channel.tags.map((tag) => (
            <ChannelTag key={tag} tag={tag} />
          ))}
        </Flex>
      </Box>
    </Link>
  );
};

const ChannelAvatar: React.FC<{ src: string }> = ({ src }) => {
  return <Image src={src} alt="avatar" h="80px" w="80px" rounded="50%" />;
};

const ChannelMembers: React.FC<{ count: number }> = ({ count }) => {
  return (
    <Flex align="center">
      <Icon as={BsFillPeopleFill} color="brand.500" />
      <Text ml="5" fontWeight="600">
        {count}
      </Text>
    </Flex>
  );
};

const ChannelName: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Text mt="5" fontSize="xl" fontWeight="600">
      {name}
    </Text>
  );
};

const ChannelDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  return (
    <Text mt="3" color="#4A5568" fontSize="sm">
      {description}
    </Text>
  );
};

const ChannelTag: React.FC<{ tag: string }> = ({ tag }) => {
  return (
    <Badge
      variant="solid"
      colorScheme="brand"
      rounded="full"
      m="1.5"
      px="2.5"
      py="1"
    >
      {tag}
    </Badge>
  );
};

export default Channels;
