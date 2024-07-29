"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { createDocument } from "@/lib/actions/room.actions";
import { useRouter } from "next/navigation";

type NewDocumentButtonProps = {
  userId: string;
  email: string;
};

const NewDocumentButton = ({ userId, email }: NewDocumentButtonProps) => {
  const router = useRouter();

  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });

      if (room) router.push(`/document/${room.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      type="submit"
      onClick={addDocumentHandler}
      className="gradient-blue flex gap-1 shadow-md"
    >
      <Image src="/assets/icons/add.svg" width={24} height={24} alt="add" />
      <p className="hidden sm:block">Create a new blank document</p>
    </Button>
  );
};

export default NewDocumentButton;
