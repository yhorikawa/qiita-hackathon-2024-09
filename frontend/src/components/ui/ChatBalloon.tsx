import { twMerge } from "tailwind-merge";

type Props = {
  message: string;
  position: "left" | "right";
};

export const ChatBallon = ({ message, position }: Props) => {
  return (
    <div
      className={twMerge([
        "flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-white border border-solid",
        position === "left"
          ? "rounded-e-xl rounded-es-xl"
          : "rounded-ee-xl rounded-s-xl",
      ])}
    >
      <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
        {message}
      </p>
    </div>
  );
};
