import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import AIMessageIcon from "./icon/aIMessageIcon.png";

type Props = {
  message: string;
  url: string;
};

export const ReplyMessageWithButton: FC<Props> = ({ message, url }) => {
  return (
    <div>
      {/** hrefの値は後で適切なものに変更 */}
      <div className="flex gap-2 items-center">
        <Image
          src={AIMessageIcon}
          alt="AIメッセージ"
          width={32}
          height={32}
          className="shrink-0 grow-0"
        />
        <p>{message}</p>
      </div>
      <p className="mt-4 ml-10">
        <Link
          href={url}
          className="py-2 px-4 rounded-md font-bold text-lg focus:outline-offset-[3px] text-white bg-violet-800 hover:bg-violet-600"
        >
          作成した記事を表示する
        </Link>
      </p>
    </div>
  );
};
