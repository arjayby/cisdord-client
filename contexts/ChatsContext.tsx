import React, { createContext, useContext, useEffect, useState } from "react";
import { ChatType } from "types/chat";
import { MessageType } from "types/message";
import { useAuthContext } from "./AuthContext";
import api from "api";
import { getChannelsByUserId } from "api/channels";
import { getMessagesByChannelId } from "api/messages";

const ChatsContext = createContext<Partial<{ chats: ChatType[] }>>({});

const ChatsProvider: React.FC = ({ children }) => {
  const { user } = useAuthContext();
  const [chats, setChats] = useState<ChatType[]>([]);

  const initialize = async (user) => {
    const channels = await getChannelsByUserId(user.id);

    const messages = await Promise.all(
      channels.data.map((channel) => getMessagesByChannelId(channel.id))
    );

    setChats(
      channels.data.map((channel, index) => {
        return {
          channel: channel,
          messages: messages[index].data,
          users: [], // Todo
        };
      })
    );
  };

  useEffect(() => {
    if (user) {
      initialize(user);
    }
  }, [user]);

  useEffect(() => {
    api.messages.on("created", (message: MessageType) => {
      setChats((prev) =>
        prev.map((chat) => {
          if (chat.channel.id === message.channelId) {
            chat.messages = [message, ...chat.messages];
          }
          return chat;
        })
      );
    });

    return () => {
      api.messages.removeListener("created");
    };
  }, []);

  return (
    <ChatsContext.Provider value={{ chats }}>{children}</ChatsContext.Provider>
  );
};

export const useChatsContext = () => useContext(ChatsContext);

export default ChatsProvider;
