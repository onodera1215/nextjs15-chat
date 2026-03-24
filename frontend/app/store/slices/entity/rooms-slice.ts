import { RoomConnection, RoomNode } from "@/graphql/graphql";
import { createApolloClient } from "@/lib/client/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import gql from "graphql-tag";
import { useAppSelector } from "../../hooks";

export interface RoomsState {
  rooms: {
    byId: Record<string, RoomNode>;
    allIds: string[];
    joinedIds: string[];
  };
}

const initialState: RoomsState = {
  rooms: {
    byId: {},
    allIds: [],
    joinedIds: [],
  },
};

const mergeRooms = (state: RoomsState, rooms: RoomNode[]) => {
  rooms.forEach((room) => {
    state.rooms.byId[room.id] = room;
    if (!state.rooms.allIds.includes(room.id)) {
      state.rooms.allIds.push(room.id);
    }
  });
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    getAvailableRooms(state, action: { payload: RoomNode[] }) {
      mergeRooms(state, action.payload);
    },
    getJoinedRooms(state, action: { payload: RoomNode[] }) {
      mergeRooms(state, action.payload);
      state.rooms.joinedIds = action.payload.map((room) => room.id);
    },
  },
});

const {
  getAvailableRooms: getAvailableRoomsAction,
  getJoinedRooms: getJoinedRoomsAction,
} = roomsSlice.actions;

export const queryRoomsThunk = createAsyncThunk(
  "entity/room/queryJoinedRooms",
  async (_, thunkAPI) => {
    const apolloClient = createApolloClient();

    try {
      const response = await apolloClient.query<{ myRooms: RoomConnection }>({
        variables: { input: {} },
        query: gql`
          query GetMyRooms($input: SearchRoomOptionInput) {
            myRooms(input: $input) {
              nodes {
                id
                name
                description
                status
                createdAt
                updatedAt
              }
            }
          }
        `,
        fetchPolicy: "no-cache",
      });

      const rooms = response.data?.myRooms?.nodes;
      if (!rooms) {
        return;
      }

      thunkAPI.dispatch(getJoinedRoomsAction(rooms));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      throw new Error(`Query error: ${message}`);
    }
  },
);

export const queryAvailableRoomsThunk = createAsyncThunk(
  "entity/room/queryAvailableRooms",
  async (_, thunkAPI) => {
    const apolloClient = createApolloClient();

    try {
      const response = await apolloClient.query<{ rooms: RoomConnection }>({
        variables: { input: {} },
        query: gql`
          query GetRooms($input: SearchRoomOptionInput) {
            rooms(input: $input) {
              nodes {
                id
                name
                description
                status
                createdAt
                updatedAt
              }
            }
          }
        `,
        fetchPolicy: "no-cache",
      });

      const rooms = response.data?.rooms?.nodes;
      if (!rooms) {
        return;
      }

      thunkAPI.dispatch(getAvailableRoomsAction(rooms));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      throw new Error(`Query error: ${message}`);
    }
  },
);

export const useRoomsSelector = () =>
  useAppSelector((state) => state.roomsReducer.rooms);

export const useRoomSelector = (roomId: string) =>
  useAppSelector((state) => state.roomsReducer.rooms.byId[roomId]);

export const useJoinedRoomsSelector = () =>
  useAppSelector((state) =>
    state.roomsReducer.rooms.joinedIds.map(
      (id) => state.roomsReducer.rooms.byId[id],
    ),
  );

export const useUnjoinedRoomsSelector = () =>
  useAppSelector((state) =>
    state.roomsReducer.rooms.allIds
      .filter((id) => !state.roomsReducer.rooms.joinedIds.includes(id))
      .map((id) => state.roomsReducer.rooms.byId[id]),
  );
