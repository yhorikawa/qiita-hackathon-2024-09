import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PrelineScript } from "./_dependencies/PrelineScript";
import "./globals.css";
import "@mdxeditor/editor/style.css";
import { HeaderLayout } from "#/components/HeaderLayout";

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";

export const metadata: Metadata = {
  title: "DocBuddy",
  description: "DocBuddy ~ 相棒のAIと壁打ちしながらドキュメント作成！ ~",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <HeaderLayout />
        <main className="bg-violet-50">
          <div className="mx-auto max-w-5xl min-h-svh relative p-12">
            {children}
          </div>
        </main>
        <PrelineScript />
      </body>
    </html>
  );
}
