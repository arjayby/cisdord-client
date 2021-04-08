import React from "react";
import {
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { UserType } from "types/user";

interface PopoverAvatarProps {
  user: UserType;
}

const PopoverAvatar: React.FC<PopoverAvatarProps> = ({ user }) => {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Avatar name={user.name} _hover={{ cursor: "pointer" }} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          {user.name}{" "}
          <Text fontSize="sm" color="gray.500">
            @{user.username}
          </Text>
        </PopoverHeader>
        <PopoverBody>
          I was created{" "}
          {formatDistanceToNow(new Date(user.createdAt), {
            addSuffix: true,
          })}
          .
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverAvatar;
