import { MessageNode, RoomNode, UserNode } from "@/graphql/graphql";
import { createSlice, ThunkAction, UnknownAction } from "@reduxjs/toolkit";

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

// 初期値
const initialState: EntityState = {
  me: null,
  users: {
    byId: {},
    allIds: [],
  },
  rooms: {
    byId: {},
    allIds: [],
  },
  messages: {
    byId: {},
    allIds: [],
    idsByRoomId: {},
  },
};

export const entitySlice = createSlice({
  name: "entity",
  initialState,
  reducers: {},
});

const signInAction = () => ({ type: "entity/user/signedIn" });

export const signInSubscriptionListener =
  (): ThunkAction<void, UserNode, unknown, UnknownAction> =>
  async (dispatch) => {
    dispatch(signInAction());
  };
