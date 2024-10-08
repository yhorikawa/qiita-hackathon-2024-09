import type { FC } from "react";
import { Input } from "#/components/ui/input";

export const TextField: FC = () => {
  return (
    <Input
      placeholder="記事タイトルを入力してください"
      className="focus-visible:ring-blue-600 text-2xl leading-relaxed"
    />
  );
};
