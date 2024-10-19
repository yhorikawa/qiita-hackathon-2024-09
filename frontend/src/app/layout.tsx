import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import "@mdxeditor/editor/style.css";
import { FooterLayout } from "#/components/FooterLayout";
import { Menu } from "#/components/ui";

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
          <main className="bg-violet-50">
            <Image
              src="/main-visual.png"
              width={390}
              height={434}
              alt="いい感じの画像"
            />
            <div className="mx-auto max-w-5xl min-h-svh relative p-12">
              {children}
            </div>
            <Menu />
          </main>
          <FooterLayout />
        </div>
      </body>
    </html>
  );
}
