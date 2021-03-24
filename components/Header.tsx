import React from "react";
import { Box, Kbd, Button } from "@chakra-ui/react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <Box
      as="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link href="/">
        <Kbd as="a" href="/" fontSize="4xl">
          cisdord
        </Kbd>
      </Link>
      <Box as="nav">
        <Link href="/channels">
          <Button
            as="a"
            href="/channels"
            colorScheme="brand"
            variant="ghost"
            mr="8"
          >
            Channels
          </Button>
        </Link>
        <Link href="/login">
          <Button as="a" href="/login" colorScheme="brand">
            Login
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
