import React from "react";
import { GetServerSideProps } from "next";
import { Badge, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { BsFillPeopleFill } from "react-icons/bs";
import Layout from "@components/Layout";
import api from "@api";
import { ChannelType } from "types/channel";

const Channel: React.FC<{ channel: ChannelType }> = ({ channel }) => {
  return (
    <Layout title={`${channel.name}'s Channel | cisdord `}>
      <Flex py="10" direction="column" align="center">
        <ChannelAvatar src="/images/avatar.jpg" />
        <ChannelMembers count={channel.membersCount} />
        <ChannelName name={channel.name} />
        <ChannelDescription description={channel.description} />
        <Flex m="-1.5" mt="10" wrap="wrap">
          {channel.tags.map((tag) => (
            <ChannelTag key={tag} tag={tag} />
          ))}
        </Flex>
        <Button mt="20" isFullWidth maxW="350" colorScheme="brand">
          Join the channel 🤝
        </Button>
      </Flex>
    </Layout>
  );
};

const ChannelAvatar: React.FC<{ src: string }> = ({ src }) => {
  return <Image src={src} alt="avatar" h="160px" w="160px" rounded="50%" />;
};

const ChannelMembers: React.FC<{ count: number }> = ({ count }) => {
  return (
    <Flex mt="8" align="center">
      <Icon as={BsFillPeopleFill} color="brand.500" />
      <Text ml="5" fontWeight="600">
        {count}
      </Text>
    </Flex>
  );
};

const ChannelName: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Text mt="8" fontSize="3xl" fontWeight="600">
      {name}
    </Text>
  );
};

const ChannelDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  return (
    <Text mt="3" color="#4A5568" fontSize="sm" maxW="900" textAlign="center">
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
