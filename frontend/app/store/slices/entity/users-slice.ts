import { UserNode } from "@/graphql/graphql";
import { createApolloClient } from "@/lib/client/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import gql from "graphql-tag";
import { useAppSelector } from "../../hooks";

export interface UsersState {
  users: {
    byId: Record<string, UserNode>;
    allIds: string[];
  };
}

// 初期値
const initialState: UsersState = {
  users: {
    byId: {},
    allIds: [],
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers(state, action: { payload: UserNode[] }) {
      action.payload.forEach((user) => {
        state.users.byId[user.id] = user;
        if (!state.users.allIds.includes(user.id)) {
          state.users.allIds.push(user.id);
        }
      });
    },
  },
});

/**
 * ユーザー情報を取得
 */
const { getUsers: getUsersAction } = usersSlice.actions;
export const queryUsersThunk = createAsyncThunk(
  "entity/user/queryUsers",
  async (_, thunkAPI) => {
    const apolloClient = createApolloClient();
    apolloClient
      .query<{ users: UserNode[] }>({
        query: gql`
          query GetUsers {
            users {
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
        const users = response?.data?.users;
        if (!users) {
          return;
        }
        thunkAPI.dispatch(getUsersAction(users));
      })
      .catch((err) => {
        throw new Error(`Query error: ${err.message}`);
      });
  }
);
export const useUsersSelector = () =>
  useAppSelector((state) => state.usersReducer.users);
