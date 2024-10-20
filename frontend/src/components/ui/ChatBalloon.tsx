import { twMerge } from "tailwind-merge";

type Props = {
  message: string;
  position: "left" | "right";
  isAi?: boolean;
};

export const ChatBallon = ({ message, position, isAi }: Props) => {
  return (
    <div
      className={twMerge([
        "flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 border border-solid",
        position === "left"
          ? "rounded-e-xl rounded-es-xl"
          : "rounded-ee-xl rounded-s-xl",
        isAi ? "bg-white" : "bg-indigo-600",
      ])}
    >
      <p
        className={twMerge([
          "text-sm font-normal py-2.5",
          isAi ? "text-gray-900" : "text-white",
        ])}
      >
        {message}
      </p>
    </div>
  );
};
