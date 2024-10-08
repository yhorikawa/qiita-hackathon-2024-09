import { usePathname } from "next/navigation";
import { useMemo } from "react";
export const useTab = () => {
  const path = usePathname();
  const activeTab = useMemo(() => {
    if (path.includes("/messages/me")) {
      return "me";
    }
    if (path.includes("/messages/someone")) {
      return "someone";
    }
    return "";
  }, [path]);
  return { activeTab };
};
