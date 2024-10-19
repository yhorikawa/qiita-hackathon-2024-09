import Link from "next/link";
import type { PropsWithChildren } from "react";

const MenuItem = ({ children }: PropsWithChildren) => {
  return (
    <li className="py-2 flex-1 flex flex-col items-center text-sm leading-normal text-gray-500 cursor-pointer">
      <Link href="#" className="flex items-center flex-col">
        {children}
      </Link>
    </li>
  );
};

export const Menu = () => {
  return (
    <nav>
      <ul className="flex bg-white">
        <MenuItem>
          <svg
            className="w-6 h-6 text-gray-500 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
              clip-rule="evenodd"
            />
          </svg>
          ホーム
        </MenuItem>
        <MenuItem>
          <svg
            className="w-6 h-6 text-gray-500 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z"
              clip-rule="evenodd"
            />
          </svg>
          交流
        </MenuItem>
      </ul>
    </nav>
  );
};
