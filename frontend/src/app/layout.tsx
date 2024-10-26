import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mdxeditor/editor/style.css";
import { FooterLayout } from "#/components/FooterLayout";
import { HeaderLayout } from "#/components/HeaderLayout";

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";

export const metadata: Metadata = {
  title: "SyncGuradian",
  description: "yncGuardian ~守護霊を通じて、思いがけない出会いを~",
  robots: {
    index: false,
  },
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
          <HeaderLayout />
          <main>
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
