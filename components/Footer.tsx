import { Center, Text } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Center>
      <Text>
        cisdord @ {new Date().getFullYear()} // open source in{" "}
        <Link href="https://github.com/arjayby/cisdord-client" isExternal>
          github
        </Link>
      </Text>
    </Center>
  );
};

export default Footer;
