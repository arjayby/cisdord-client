import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import Layout from "@components/Layout";
import withAuth from "@components/withAuth";

const Me: React.FC = () => {
  return (
    <Layout title="cisdord">
      <Box py="10" h="100%">
        <Flex h="inherit" border="1px" borderColor="gray.100" borderRadius="25">
          <Box p="4" w="64px">
            <SimpleGrid dir="column" gap={4}>
              <Avatar name="1" src="/images/avatar.jpg" />
              <Avatar name="2" src="/images/avatar.jpg" />
              <Avatar name="3" src="/images/avatar.jpg" />
              <Avatar name="3" src="/images/avatar.jpg" />
              <Avatar name="3" src="/images/avatar.jpg" />
              <Divider />
              <IconButton
                aria-label="Add channel"
                colorScheme="brand"
                size="lg"
                isRound
                icon={<Icon as={MdAdd} fontSize="xl" />}
              />
            </SimpleGrid>
          </Box>
          <Divider orientation="vertical" mx="4" />
          <Flex p="4" pl="-4" direction="column" flex={1}>
            <Flex justify="space-between">
              <Flex direction="column">
                <Text fontSize="xl">League of Legends ⚔</Text>
                <Text color="gray.500" fontSize="xs">
                  24 minutes ago
                </Text>
              </Flex>
              <Flex align="center">
                <Icon as={BsFillPeopleFill} color="brand.500" />
                <Text ml="4" fontWeight="600">
                  420,666
                </Text>
              </Flex>
            </Flex>
            <Box my="5" flex={1}>
              <Flex direction="column">
                <Flex>
                  <Avatar alignSelf="flex-end" name="user 1" size="sm" mr="2" />
                  <Text
                    p="4"
                    bgColor="gray.200"
                    borderRadius="16px 16px 16px 0"
                    fontSize="sm"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure, ipsum!
                  </Text>
                </Flex>
                <Flex alignSelf="flex-end">
                  <Text
                    p="4"
                    bgColor="brand.500"
                    color="white"
                    borderRadius="16px 16px 0 16px"
                    fontSize="sm"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure, ipsum!
                  </Text>
                  <Avatar alignSelf="flex-end" ml="2" name="user 2" size="sm" />
                </Flex>
                <Flex>
                  <Avatar alignSelf="flex-end" name="user 3" size="sm" mr="2" />
                  <Text
                    p="4"
                    bgColor="gray.200"
                    borderRadius="16px 16px 16px 0"
                    fontSize="sm"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure, ipsum!
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Flex>
              <Input variant="outline" placeholder="Message" mr="5" />
              <Button colorScheme="brand">Send 🕊</Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};

export default withAuth(Me);
