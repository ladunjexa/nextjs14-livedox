"use server";

import { AccessType, CreateDocumentParams, ShareDocumentParams } from "@/types";
import { RoomAccesses } from "@liveblocks/node";
import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "../utils";

export async function createDocument({ userId, email }: CreateDocumentParams) {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: [],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log(`Error creating document: ${error}`);
  }
}

export async function getDocument({ roomId, userId }: { roomId: string; userId: string }) {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      throw new Error("You don't have access to this document");
    }

    return parseStringify(room);
  } catch (error) {
    console.log(`Error getting document: ${error}`);
  }
}

export async function updateDocument(roomId: string, title: string) {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });

    revalidatePath(`/document/${roomId}`);

    return parseStringify(updatedRoom);
  } catch (error) {
    console.log(`Error updating document: ${error}`);
  }
}

export async function getDocuments(email: string) {
  try {
    const rooms = await liveblocks.getRooms({ userId: email });

    return parseStringify(rooms);
  } catch (error) {
    console.log(`Error getting document: ${error}`);
  }
}

export async function deleteDocument(roomId: string) {}

export async function updateDocumentAccess({
  roomId,
  email,
  userType,
  updatedBy,
}: ShareDocumentParams) {
  try {
    const userAccesses: RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    };

    const room = await liveblocks.updateRoom(roomId, {
      userAccesses,
    });

    if (room) {
      // TODO: Send a notification to the user
    }

    revalidatePath(`/document/${roomId}`);
  } catch (error) {
    console.log(`Error updating document access: ${error}`);
  }
}

export async function removeCollaborator({ roomId, email }: { roomId: string; email: string }) {
  try {
    const room = await liveblocks.getRoom(roomId);

    if (room.metadata.email === email) {
      throw new Error("You can't remove the creator of the document");
    }

    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null,
      },
    });

    revalidatePath(`/document/${roomId}`);
    return parseStringify(updatedRoom);
  } catch (error) {
    console.log(`Error removing collaborator: ${error}`);
  }
}
