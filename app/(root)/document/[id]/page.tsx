import { Editor } from "@/components/editor/Editor";
import Header from "@/components/layout/header";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

type Props = {};

export default function Document(props: Props) {
  return (
    <main>
      <Header>
        <div className="flex w-fit items-center justify-center gap-2">
          <p className="document-title">document title</p>
        </div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>
      <Editor />
    </main>
  );
}
