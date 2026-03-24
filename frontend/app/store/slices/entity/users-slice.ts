import { UserConnection, UserNode } from "@/graphql/graphql";
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

const { getUsers: getUsersAction } = usersSlice.actions;

export const queryUsersThunk = createAsyncThunk(
  "entity/user/queryUsers",
  async (_, thunkAPI) => {
    const apolloClient = createApolloClient();

    try {
      const response = await apolloClient.query<{ users: UserConnection }>({
        variables: { input: {} },
        query: gql`
          query GetUsers($input: SearchUsersInput!) {
            users(input: $input) {
              nodes {
                id
                name
                email
                icon
              }
            }
          }
        `,
        fetchPolicy: "no-cache",
      });

      const users = response.data?.users?.nodes;
      if (!users) {
        return;
      }

      thunkAPI.dispatch(getUsersAction(users));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      throw new Error(`Query error: ${message}`);
    }
  },
);

export const useUsersSelector = () =>
  useAppSelector((state) => state.usersReducer.users);
