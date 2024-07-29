"use client";

import * as React from "react";
import { LiveblocksProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import Loader from "@/components/atoms/loader";
import { getClerkUsers } from "@/lib/actions/user.actions";

export function LiveBlocksProvider({ children }: { children: React.ReactNode }) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
}
