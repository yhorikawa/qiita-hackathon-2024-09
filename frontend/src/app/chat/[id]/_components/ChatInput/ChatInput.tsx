"use client";
import type { FC } from "react";
import { TextArea } from "#/components/TextArea";
import { usePostChat } from "./use-post-chat";

export const ChatInput: FC<{ updateChat: () => void; disabled: boolean }> = ({
  updateChat,
  disabled,
}) => {
  const { text, setText, handleAction, isLoading } = usePostChat(updateChat);
  return (
    <div className="pt-4 pb-10 sticky bottom-0 backdrop-blur-lg px-2">
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onClick={handleAction}
        disabled={disabled || isLoading}
      />
    </div>
  );
};
