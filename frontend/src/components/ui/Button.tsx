import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  type?: "button" | "submit";
  icon?: boolean;
  isDisabled?: boolean;
  isFull?: boolean;
  onClick?: () => void;
} & PropsWithChildren;

export const Button = ({
  children,
  type = "button",
  icon = false,
  isDisabled = false,
  isFull = false,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      className={twMerge(
        "mt-6 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none",
        isFull ? "w-full" : "w-auto",
        isDisabled
          ? "bg-gray-400 cursor-not-allowed opacity-35"
          : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white",
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      <div
        className={twMerge(
          icon ? "flex items-center" : undefined,
          isFull && "justify-center",
        )}
      >
        <p>{children}</p>
        {icon && !isDisabled ? (
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        ) : null}
      </div>
    </button>
  );
};
