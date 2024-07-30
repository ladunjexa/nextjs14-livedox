"use client";

import * as React from "react";
import { LiveblocksProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import Loader from "@/components/atoms/loader";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";

export function LiveBlocksProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
          text,
        });

        return roomUsers;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
}
