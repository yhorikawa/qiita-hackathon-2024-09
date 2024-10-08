import type { PropsWithChildren } from "react";

export const AllPaddingLayout = ({ children }: PropsWithChildren) => (
  <div className="p-6 flex flex-col gap-4">{children}</div>
);
