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

const { setMe: setMeAction } = entitySlice.actions;

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
        thunkAPI.dispatch(setMeAction(user));
      })
      .catch((err) => {
        throw new Error(`Query error: ${err.message}`);
      });
  }
);
