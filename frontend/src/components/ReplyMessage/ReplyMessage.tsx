import Image from "next/image";
import type { FC } from "react";
import AIMessageIcon from "./icon/aIMessageIcon.png";

type Props = {
  message: string;
};

export const ReplyMessage: FC<Props> = ({ message }) => {
  return (
    <>
      {/** hrefの値は後で適切なものに変更 */}
      <div className="flex gap-2 items-center">
        <Image
          src={AIMessageIcon}
          alt="AIメッセージ"
          width={32}
          height={32}
          className="shrink-0 grow-0"
        />
        <p className="max-w-[856px]">{message}</p>
      </div>
    </>
  );
};
