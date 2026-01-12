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
    getMe(state, action: { payload: UserNode }) {
      state.me = action.payload;
    },
    getRooms(state, action: { payload: RoomNode[] }) {
      action.payload.forEach((room) => {
        state.rooms.byId[room.id] = room;
        if (!state.rooms.allIds.includes(room.id)) {
          state.rooms.allIds.push(room.id);
        }
      });
    },
  },
});

/**
 * ログインユーザー情報を取得処理
 */
const { getMe: getMeAction } = entitySlice.actions;
export const queryMeThunk = createAsyncThunk(
  "entity/user/queryMe",
  async (_, thunkAPI) => {
    const apolloClient = createApolloClient();
    apolloClient
      .query<UserNode>({
        query: gql`
          query GetMe {
            me {
              id
              name
              email
              oauthProvider
              oauthProviderAccountId
              status
              createdAt
              updatedAt
            }
          }
        `,
        fetchPolicy: "no-cache",
      })
      .then((response) => {
        const user = response.data;
        if (!user) {
          return;
        }
        thunkAPI.dispatch(getMeAction(user));
      })
      .catch((err) => {
        throw new Error(`Query error: ${err.message}`);
      });
  }
);

/**
 * ルーム情報取得処理
 */
const { getRooms: getRoomsAction } = entitySlice.actions;
export const queryRoomsThunk = createAsyncThunk(
  "entity/room/queryRooms",
  async (_, thunkAPI) => {
    const apolloClient = createApolloClient();
    apolloClient
      .query<{ rooms: RoomNode[] }>({
        query: gql`
          query GetRooms {
            rooms {
              id
              name
              description
              status
              createdAt
              updatedAt
            }
          }
        `,
        fetchPolicy: "no-cache",
      })
      .then((response) => {
        const rooms = response?.data?.rooms;
        if (!rooms) {
          return;
        }
        thunkAPI.dispatch(getRoomsAction(rooms));
      })
      .catch((err) => {
        throw new Error(`Query error: ${err.message}`);
      });
  }
);
