import type { FC, PropsWithChildren } from "react";
import { BaseButton } from "./BaseButton";

export const PrimaryButton: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BaseButton colors="text-white bg-violet-800 hover:bg-violet-600">
      {children}
    </BaseButton>
  );
};
