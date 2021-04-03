import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

const Loading: React.FC = () => {
  return (
    <Box h="100vh" display="grid" placeItems="center">
      <Spinner size="xl" color="brand.400" />
    </Box>
  );
};

export default Loading;
