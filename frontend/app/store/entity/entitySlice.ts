import { MessageNode, RoomNode, UserNode } from "@/graphql/graphql";

export interface EntityState {
  me: UserNode | null;
  users: {
    byId: Record<string, UserNode>;
    allIds: string[];
  };
  rooms: {
    byId: Record<string, RoomNode>;
    allIds: string[];
  };
  messages: {
    byId: Record<string, MessageNode>;
    allIds: string[];
    idsByRoomId: Record<string, string[]>;
  };
}
