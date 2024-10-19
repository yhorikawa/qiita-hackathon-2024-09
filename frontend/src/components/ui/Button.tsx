import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  type?: "button" | "submit";
  icon?: boolean;
  onClick?: () => void;
} & PropsWithChildren;

export const Button = ({
  children,
  type = "button",
  icon = false,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={onClick}
    >
      <div className={icon ? "flex items-center" : undefined}>
        <p>{children}</p>
        {icon ? (
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        ) : null}
      </div>
    </button>
  );
};
