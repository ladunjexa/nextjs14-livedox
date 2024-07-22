import { Editor } from "@/components/editor/Editor";
import Header from "@/components/layout/header";
import React from "react";

type Props = {};

export default function Document(props: Props) {
  return (
    <main>
      <Header>
        <div className="flex w-fit items-center justify-center gap-2">
          <p className="document-title">document title</p>
        </div>
      </Header>
      <Editor />
    </main>
  );
}
