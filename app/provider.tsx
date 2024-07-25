"use client";

import * as React from "react";
import { LiveblocksProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import Loader from "@/components/atoms/loader";

export function LiveBlocksProvider({ children }: { children: React.ReactNode }) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      //   publicApiKey={"pk_dev_UtjBqTMlQrcGbEOqPl_alexEkb6oyuO2-bwW30izdAbTtPzFnMmKMK0S3KqqRfil"}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
}
