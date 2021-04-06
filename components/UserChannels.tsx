import React from "react";
import {
  Box,
  SimpleGrid,
  Avatar,
  Divider,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { ChannelType } from "types/channel";

interface UserChannelsProps {
  channels: ChannelType[];
  selectedChannel?: ChannelType;
  onClickChannel?: (shortId: string) => void;
}

const UserChannels: React.FC<UserChannelsProps> = ({
  channels,
  selectedChannel = {},
  onClickChannel = () => {},
}) => {
  const handleOnClickChannel = (shortId: string) => () => {
    onClickChannel(shortId);
  };

  return (
    <Box p="4" w="64px">
      <SimpleGrid dir="column" gap={4}>
        {channels.map((channel) => (
          <Box
            key={`user-channel-${channel.shortId}`}
            h="48px"
            w="48px"
            rounded="full"
            display="grid"
            placeItems="center"
            border={selectedChannel.id === channel.id ? "1px" : undefined}
            borderColor={
              selectedChannel.id === channel.id ? "brand.500" : undefined
            }
            _hover={{
              cursor: "pointer",
              border: "1px",
              borderColor: "brand.500",
            }}
            onClick={handleOnClickChannel(channel.shortId)}
          >
            <Avatar h="44px" w="44px" name={channel.name} />
          </Box>
        ))}
        {channels.length > 0 && <Divider />}
        <IconButton
          aria-label="Add channel"
          colorScheme="brand"
          size="lg"
          isRound
          icon={<Icon as={MdAdd} fontSize="xl" />}
        />
      </SimpleGrid>
    </Box>
  );
};

export default UserChannels;
