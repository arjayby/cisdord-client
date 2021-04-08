import React from "react";
import { Divider, Flex, Grid, Text } from "@chakra-ui/react";
import Message from "./Message";
import { UserType } from "types/user";
import { MessageType } from "types/message";
import { formatRelative } from "date-fns";
import { locale, groupMessages } from "utils";

interface MessagesProps {
  user: UserType;
  messages: MessageType[];
}

const Messages: React.FC<MessagesProps> = ({ user, messages }) => {
  const groupByDate = groupMessages(messages, "date");

  return (
    <>
      {Object.keys(groupByDate).map((day) => {
        return (
          <Grid key={day} row={1} gap={3} p="5">
            <Flex align="center">
              <Divider />
              <Text mx="3" fontSize="xs" textAlign="center" color="gray.500">
                {formatRelative(new Date(day), new Date(), { locale })}
              </Text>
              <Divider />
            </Flex>
            {groupByDate[day].map((message, index) => (
              <Message
                key={`message-${message.id}`}
                user={user}
                message={message}
                nextMessage={groupByDate[day][index + 1]}
              />
            ))}
          </Grid>
        );
      })}
    </>
  );
};

export default Messages;
