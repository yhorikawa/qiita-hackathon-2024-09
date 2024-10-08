"use client";

import type { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { type FC, Suspense, useRef } from "react";

const EditorComp = dynamic(() => import("#/components/MDXEditor/MDXEditor"), {
  ssr: false,
});

export const MDXEditor: FC<{ md: string }> = ({ md }) => {
  const ref = useRef<MDXEditorMethods>(null);
  return (
    <Suspense fallback={null}>
      <EditorComp editorRef={ref} markdown={md} />
    </Suspense>
  );
};
