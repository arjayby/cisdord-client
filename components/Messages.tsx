import React from "react";
import { Grid, Text } from "@chakra-ui/react";
import Message from "./Message";
import { UserType } from "types/user";
import { MessageType } from "types/message";
import { groupMessages } from "utils";

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
          <Grid key={day} row={1} gap={3}>
            <Text fontSize="xs" textAlign="center" color="gray.500">
              {day}
            </Text>
            {groupByDate[day].map((message, index) => (
              <Message
                key={`message-${message.id}`}
                user={user}
                message={message}
                previousMessage={groupByDate[day][index - 1]}
              />
            ))}
          </Grid>
        );
      })}
    </>
  );
};

export default Messages;
