import CollaborativeRoom from "@/components/core/collaborative-room";
import { getDocument } from "@/lib/actions/room.actions";
import { SearchParamProps } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Document({ params: { id } }: SearchParamProps) {
  const clerkUser = await currentUser();

  if (!clerkUser) redirect("/sign-in");

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });

  if (!room) redirect("/");

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom roomId={id} roomMetadata={room.metadata} />
    </main>
  );
}
