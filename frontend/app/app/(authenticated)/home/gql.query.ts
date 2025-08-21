import gql from "graphql-tag";

export const GetRoomsQuery = gql`
  query GetRooms($input: SearchRoomOptionInput!) {
    rooms(input: $input) {
      id
      name
    }
  }
`;
