"use client";
import type { FC } from "react";
import { MessageBubble } from "#/components/MessageBubble";
import { ReplyMessage } from "#/components/ReplyMessage";
import { ReplyMessageWithButton } from "#/components/ReplyMessage";
import { ChatInput } from "../ChatInput";
import { useGetConversationsList } from "./use-get-conversations-list";

export const Chat: FC = () => {
  const { data, mutate } = useGetConversationsList();
  if (!data) return null;

  const conversation = data.data.conversation;
  const isCompleteChat = conversation.askCount >= 4;

  return (
    <>
      <div className="flex flex-col gap-6 overflow-auto">
        {data.data.messages.map(({ sender, message, id }) => {
          return (
            <ChatItem
              key={id}
              position={sender === "user" ? "right" : "left"}
              message={message}
            />
          );
        })}
        {isCompleteChat && (
          <ReplyMessageWithButton
            message="記事を作成しました！"
            url={`/api/v1/conversations/${conversation.id}/redirect-document`}
          />
        )}
      </div>
      <ChatInput disabled={isCompleteChat} updateChat={mutate} />
    </>
  );
};

const ChatItem: FC<{ position: "left" | "right"; message: string }> = ({
  position,
  message,
}) => {
  return position === "right" ? (
    <div className="ml-auto">
      <MessageBubble>{message}</MessageBubble>
    </div>
  ) : (
    <div className="mr-auto">
      <ReplyMessage message={message} />
    </div>
  );
};
