import { UserNode } from "@/graphql/graphql";
import { createApolloClient } from "@/lib/client/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import gql from "graphql-tag";
import { useAppSelector } from "../../hooks";

export interface MeState {
  me: UserNode | null;
}

// 初期値
const initialState: MeState = {
  me: null,
};

export const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    getMe(state, action: { payload: UserNode }) {
      state.me = action.payload;
    },
  },
});

/**
 * ログインユーザー情報を取得処理
 */
const { getMe: getMeAction } = meSlice.actions;
export const queryMeThunk = createAsyncThunk(
  "entity/user/queryMe",
  async (_, thunkAPI) => {
    const apolloClient = createApolloClient();
    apolloClient
      .query<{ me: UserNode }>({
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
        const user = response.data?.me;
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
export const useMeSelector = (): UserNode => {
  const me = useAppSelector((state) => state.meReducer.me);
  if (!me) {
    throw new Error("ログインユーザー情報が存在しません。");
  }
  return me;
};
