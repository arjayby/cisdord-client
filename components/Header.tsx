import React from "react";
import { Box, Link, Kbd, Button } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Box
      as="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link href="/">
        <Kbd fontSize="4xl">cisdord</Kbd>
      </Link>
      <Box as="nav">
        <Button colorScheme="brand" variant="ghost" mr="8">
          Channels
        </Button>
        <Button colorScheme="brand">Login</Button>
      </Box>
    </Box>
  );
};

export default Header;
