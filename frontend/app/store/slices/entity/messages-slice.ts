import { MessageNode } from "@/graphql/graphql";
import { createApolloClient } from "@/lib/client/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import gql from "graphql-tag";
import { useAppSelector } from "../../hooks";
import { Subscription } from "rxjs";

export interface MessagesState {
  messages: {
    byId: Record<string, MessageNode>;
    allIds: string[];
    idsByRoomId: Record<string, string[]>;
  };
}

// 初期値
const initialState: MessagesState = {
  messages: {
    byId: {},
    allIds: [],
    idsByRoomId: {},
  },
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
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
 * メッセージ情報を取得
 */
const { getMessages: getMessagesAction } = messagesSlice.actions;
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
    (state) => state.messagesReducer.messages.idsByRoomId[roomId] || []
  );
  return useAppSelector((state) =>
    ids.map((id) => state.messagesReducer.messages.byId[id])
  );
};

/**
 * エンティティー系のサブスクリプション処理群
 */
const { receiveMessage: receiveMessageAction } = messagesSlice.actions;

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
