import gql from "graphql-tag";

export const GetRoomsQuery = gql`
  query GetRooms($input: String!) {
    rooms(input: $input) {
      id
    }
  }
`;
