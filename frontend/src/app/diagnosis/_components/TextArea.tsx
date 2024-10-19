"use client";
import { useId } from "react";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  text: string;
  setText: (text: string) => void;
};

export const TextArea = ({ text, setText }: Props) => {
  const textareaId = useId();
  return (
    <TextareaAutosize
      id={textareaId}
      value={text}
      onInput={(e) => setText(e.currentTarget.value)}
      className="py-6 px-4 block w-full border-gray-200 rounded-lg text-sm"
      minRows={10}
      cacheMeasurements={true}
      placeholder="回答を入力..."
      disabled={false}
    />
  );
};
