import React from "react";
import { Box, Center } from "@chakra-ui/react";

import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";

interface LayoutProps {
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  title = "cisdord",
  description = "cisdord is a realtime messaging application. Connect with the community through different channels.",
  children,
}) => {
  return (
    <Center>
      <Box w="1260px">
        <Box p="10" h="100vh" display="grid" gridTemplateRows="auto 1fr auto">
          <Head>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta
              name="keywords"
              content="cisdord, chat, message, channel, member"
            />
            <meta name="robots" content="index, follow" />
            <meta
              http-equiv="Content-Type"
              content="text/html; charset=utf-8"
            />
            <meta name="language" content="English" />
          </Head>
          <Header />
          <main>{children}</main>
          <Footer />
        </Box>
      </Box>
    </Center>
  );
};

export default Layout;
