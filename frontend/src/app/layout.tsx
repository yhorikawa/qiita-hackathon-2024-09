import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mdxeditor/editor/style.css";
import { FooterLayout } from "#/components/FooterLayout";

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";

export const metadata: Metadata = {
  title: "マンホールは大体円形",
  description: "マンホールは大体円形",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="w-[390px] m-auto">
          <header className="h-8 px-4 py-2 flex items-center">
            <h1 className="text-violet-500 text-xl font-bold">
              なんかいい感じのロゴ
            </h1>
          </header>
          <main className="bg-gray-50">
            <div className="mx-auto max-w-5xl min-h-svh relative">
              {children}
            </div>
          </main>
          <FooterLayout />
        </div>
      </body>
    </html>
  );
}
