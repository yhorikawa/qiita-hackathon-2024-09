"use client";

import Link from "next/link";
import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { FooterLayout } from "./FooterLayout";
import { useTab } from "./use-tab";

export const NavigationLayout = ({ children }: PropsWithChildren<unknown>) => {
  //TODO: useTabは編集予定
  const { activeTab } = useTab();
  return (
    <div className="pt-6">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-2 gap-2" aria-label="Tabs">
          <Link
            href="/tab1"
            className={twMerge(
              "w-full justify-center py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none active",
              activeTab === "tab1"
                ? "font-semibold border-blue-600 text-blue-600"
                : "",
            )}
            role="tab"
          >
            タブ1
          </Link>
        </nav>
      </div>
      <div className="p-6 min-h-[calc(100lvh_-_72px-79px)]">{children}</div>
      <FooterLayout />
    </div>
  );
};
