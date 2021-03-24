import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Center,
  Flex,
  Grid,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsFillPeopleFill } from "react-icons/bs";
import Layout from "@components/Layout";
import api from "../../api";
import Link from "next/link";

const Channels: React.FC = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    api.channels.find().then((res) => {
      setChannels(res.data);
    });
  }, []);
  return (
    <Layout title="Channels | cisdord">
      <Box py="10">
        <Grid templateColumns="repeat(3, 1fr)" gap={8}>
          {channels.map((channel) => (
            <Link href={`/channels/${channel.shortId}`}>
              <Box
                as="a"
                href={`/channels/${channel.shortId}`}
                p="5"
                pb="0"
                key={channel.id}
                rounded="20px"
                boxShadow="xl"
              >
                <Flex justify="space-between">
                  <Image
                    src="/images/avatar.jpg"
                    alt="avatar"
                    h="80px"
                    w="80px"
                    rounded="50%"
                  />
                  <Center>
                    <Icon as={BsFillPeopleFill} color="brand.400" />
                    <Text ml="5" fontWeight="600">
                      {channel.membersCount}{" "}
                    </Text>
                  </Center>
                </Flex>
                <Box textAlign="start">
                  <Text mt="5" fontSize="xl" fontWeight="600">
                    {channel.name}
                  </Text>
                  <Text mt="3" color="#4A5568" fontSize="sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam adipisci iure itaque expedita totam eligendi
                    repellat reprehenderit quos aliquam recusandae.
                  </Text>
                </Box>
                <Flex mt="10" wrap="wrap">
                  {["Tag 1", "Tag 2", "Tag 3"].map((tag) => (
                    <Badge
                      variant="solid"
                      colorScheme="brand"
                      rounded="full"
                      px="3"
                      py="1"
                      mr="3"
                      mb="5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </Flex>
              </Box>
            </Link>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Channels;
