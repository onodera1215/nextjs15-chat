'use client';

import AuthenticatedPageTitle from "@/components/atoms/AuthenticatedPageTitle";
import { useQuery } from "@apollo/client/react";
import gql from "graphql-tag";

export const GetRoomsQuery = gql`
  query GetRooms($input: SearchRoomOptionInput!) {
    rooms(input: $input) {
      id
      name
    }
  }
`;


export default function Content() {
  const { loading, error, data } = useQuery(GetRoomsQuery);
  console.log({ loading, error, data });
  return <>
    <AuthenticatedPageTitle title="ホーム" />
  </>
}