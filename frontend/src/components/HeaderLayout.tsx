"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const HeaderLayout = () => {
  const path = usePathname();
  const isTop = path === "/";

  if (isTop) return null;

  return (
    <header className="px-4 py-2 border-b border-opacity-10">
      <Image src="/logo.png" alt="yncGuardian" width={134} height={27} />
    </header>
  );
};
