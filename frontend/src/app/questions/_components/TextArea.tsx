"use client";
import { useId } from "react";
import TextareaAutosize from "react-textarea-autosize";

export const TextArea = ({ ...args }) => {
  const textareaId = useId();
  return (
    <TextareaAutosize
      id={textareaId}
      className="py-6 px-4 block w-full border-gray-200 rounded-lg text-sm"
      minRows={10}
      cacheMeasurements={true}
      placeholder="回答を入力..."
      disabled={false}
      {...args}
    />
  );
};
