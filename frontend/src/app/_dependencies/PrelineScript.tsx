"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export const PrelineScript = () => {
  const path = usePathname();
  const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    import("preline/preline").then(() => {
      setInitiated(true);
    });
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setTimeout(() => {
      if (typeof window === "undefined") return;
      if (typeof window?.HSStaticMethods === "undefined") return;
      window.HSStaticMethods.autoInit();
    }, 100);
  }, [path]);

  return null;
};
