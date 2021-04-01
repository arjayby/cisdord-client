import React from "react";
import Link from "next/link";
import { Box, Button, Flex, Heading, Icon, Image } from "@chakra-ui/react";
import { TiSocialGithub } from "react-icons/ti";
import Layout from "@components/Layout";

const Hero: React.FC = () => {
  return (
    <Box h="100%" display="grid" placeItems="center">
      <Flex w="100%" justify="space-between">
        <Flex direction="column" justify="center">
          <Heading as="h1" lineHeight="1.4">
            Connect with the community. Message your friends.
          </Heading>
          <Flex mt="10" direction="column" align="flex-start">
            <Link href="/sign-up">
              <Button as="a" href="/sign-up" colorScheme="brand">
                Join now
              </Button>
            </Link>
            <Button mt="5" rightIcon={<Icon as={TiSocialGithub} boxSize={6} />}>
              Connect with Github
            </Button>
          </Flex>
        </Flex>
        <Image
          alt="message"
          src="images/undraw_texting_k35o.svg"
          w="680px"
          ignoreFallback
        />
      </Flex>
    </Box>
  );
};

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
    </Layout>
  );
};

export default Home;
