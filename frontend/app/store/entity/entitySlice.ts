import { MessageNode, RoomNode, UserNode } from "@/graphql/graphql";
import { createApolloClient } from "@/lib/client/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import gql from "graphql-tag";
import { useAppSelector } from "../hooks";
import { Subscription } from "rxjs";

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
    getUsers(state, action: { payload: UserNode[] }) {
      action.payload.forEach((user) => {
        state.users.byId[user.id] = user;
        if (!state.users.allIds.includes(user.id)) {
          state.users.allIds.push(user.id);
        }
      });
    },
    getMessages(state, action: { payload: MessageNode[] }) {
      action.payload.forEach((message) => {
        state.messages.byId[message.id] = message;
        if (!state.messages.allIds.includes(message.id)) {
          state.messages.allIds.push(message.id);
        }
        if (!state.messages.idsByRoomId[message.roomId]) {
          state.messages.idsByRoomId[message.roomId] = [];
        }
        if (!state.messages.idsByRoomId[message.roomId].includes(message.id)) {
          state.messages.idsByRoomId[message.roomId].push(message.id);
        }
      });
    },
    receiveMessage(state, action: { payload: MessageNode }) {
      const message = action.payload;
      state.messages.byId[message.id] = message;
      if (!state.messages.allIds.includes(message.id)) {
        state.messages.allIds.push(message.id);
      }
      if (!state.messages.idsByRoomId[message.roomId]) {
        state.messages.idsByRoomId[message.roomId] = [];
      }
      if (!state.messages.idsByRoomId[message.roomId].includes(message.id)) {
        state.messages.idsByRoomId[message.roomId].push(message.id);
      }
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
  const me = useAppSelector((state) => state.entityReducer.me);
  if (!me) {
    throw new Error("ログインユーザー情報が存在しません。");
  }
  return me;
};

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
export const useRoomsSelector = () =>
  useAppSelector((state) => state.entityReducer.rooms);
export const useRoomSelector = (roomId: string) =>
  useAppSelector((state) => state.entityReducer.rooms.byId[roomId]);

/**
 * ユーザー情報を取得
 */
const { getUsers: getUsersAction } = entitySlice.actions;
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
  useAppSelector((state) => state.entityReducer.users);

/**
 * メッセージ情報を取得
 */
const { getMessages: getMessagesAction } = entitySlice.actions;
export const queryMessagesThunk = createAsyncThunk(
  "entity/message/queryMessages",
  async ({ roomId }: { roomId: string }, thunkAPI) => {
    const apolloClient = createApolloClient();
    apolloClient
      .query<{ messages: MessageNode[] }>({
        query: gql`
          query GetMessages($input: SearchMessagesInput!) {
            messages(input: $input) {
              id
              body
              roomId
              senderId
              sender {
                id
                name
                icon
              }
              createdAt
              updatedAt
            }
          }
        `,
        variables: { input: { roomId } },
        fetchPolicy: "no-cache",
      })
      .then((response) => {
        const messages = response?.data?.messages;
        if (!messages) {
          return;
        }
        thunkAPI.dispatch(getMessagesAction(messages));
      })
      .catch((err) => {
        throw new Error(`Query error: ${err.message}`);
      });
  }
);
export const useMessagesSelector = (roomId: string) => {
  const ids = useAppSelector(
    (state) => state.entityReducer.messages.idsByRoomId[roomId] || []
  );
  return useAppSelector((state) =>
    ids.map((id) => state.entityReducer.messages.byId[id])
  );
};

/**
 * エンティティー系のサブスクリプション処理群
 */
const { receiveMessage: receiveMessageAction } = entitySlice.actions;

// subscription解除用の配列
const subscribers = new Map<string, Subscription>();

export const startEntitySubscriptions = createAsyncThunk(
  "entity/subscription/startEntitySubscriptions",
  async (_, thunkAPI) => {
    if (subscribers.has("messageSubscription")) {
      return;
    }
    const apolloClient = createApolloClient();
    const messageSubscription = apolloClient
      .subscribe<{ messageCreated: MessageNode }>({
        query: gql`
          subscription OnMessageCreated {
            messageCreated {
              id
              body
              roomId
              senderId
              sender {
                id
                name
                icon
              }
              createdAt
              updatedAt
            }
          }
        `,
      })
      .subscribe({
        next(response) {
          const newMessage = response.data?.messageCreated;
          if (!newMessage) {
            return;
          }
          thunkAPI.dispatch(receiveMessageAction(newMessage));
        },
        error(err) {
          throw new Error(`Subscription error: ${err.message}`);
        },
        complete() {
          console.log("Message subscription completed");
        },
      });
    subscribers.set("messageSubscription", messageSubscription);
  }
);
