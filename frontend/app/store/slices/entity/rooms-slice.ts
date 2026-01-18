import { RoomNode } from "@/graphql/graphql";
import { createApolloClient } from "@/lib/client/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import gql from "graphql-tag";
import { useAppSelector } from "../../hooks";

export interface RoomsState {
  rooms: {
    byId: Record<string, RoomNode>;
    allIds: string[];
  };
}

// 初期値
const initialState: RoomsState = {
  rooms: {
    byId: {},
    allIds: [],
  },
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
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
 * ルーム情報取得処理
 */
const { getRooms: getRoomsAction } = roomsSlice.actions;
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
  useAppSelector((state) => state.roomsReducer.rooms);
export const useRoomSelector = (roomId: string) =>
  useAppSelector((state) => state.roomsReducer.rooms.byId[roomId]);
