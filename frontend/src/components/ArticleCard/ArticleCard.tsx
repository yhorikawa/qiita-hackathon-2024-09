import { format } from "date-fns";
import type { FC } from "react";

type Props = {
  title: string;
  date: Date;
};

export const ArticleCard: FC<Props> = ({ title, date }) => {
  return (
    <div className="rounded-md bg-white py-3 px-4">
      <p className="font-bold text-base opacity-87">{title}</p>
      <p className="mt-2 opacity-60 text-black text-xs">
        {format(date, "yyyy/MM/dd")}
      </p>
    </div>
  );
};
