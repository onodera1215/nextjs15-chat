import { MessageNode, RoomNode, UserNode } from "@/graphql/graphql";
import { createApolloClient } from "@/lib/client/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import gql from "graphql-tag";

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
  reducers: {
    setMe(state, action: { payload: UserNode }) {
      state.me = action.payload;
    },
  },
});

// ログイン監視
const signInAction = (payload: UserNode) => ({
  type: "entity/user/signIn",
  payload,
});
export const subscribeSignInThunk = createAsyncThunk(
  "entity/user/signInSubscription",
  async (_, thunkAPI) => {
    const apolloClient = createApolloClient();
    apolloClient
      .subscribe<UserNode>({
        query: gql``,
        fetchPolicy: "no-cache",
      })
      .subscribe({
        next(response) {
          const user = response.data;
          if (!user) {
            return;
          }
          thunkAPI.dispatch(signInAction(user));
        },
        error(err) {
          throw new Error(`Subscription error: ${err.message}`);
        },
      });
  }
);
