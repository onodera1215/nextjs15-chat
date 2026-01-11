'use client';

import AuthenticatedPageTitle from "@/components/atoms/AuthenticatedPageTitle";
import { GetRoomsQuery, GetUserByEmailQuery, GetUserQuery } from "@/graphql/graphql";
import { useQuery } from "@apollo/client/react";
import gql from "graphql-tag";
import { useSession } from 'next-auth/react';

const GetRoomsQuery = gql`
  query GetRooms($input: SearchRoomOptionInput) {
    rooms(input: $input) {
      id
      name
    }
  }
`;

const GetUserByEmailQuery = gql`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
    }
  }
`;

const GetUserQuery = gql`
  query GetUser($userId: String!) {
    user(userId: $userId) {
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
`;

export default function Content() {
  const session = useSession();

  const { data: rooms } = useQuery<GetRoomsQuery>(GetRoomsQuery);
  const { data: userByEmail } = useQuery<GetUserByEmailQuery>(GetUserByEmailQuery, { variables: { email: session?.data?.user?.email } });
  const { loading: loadingUser, error: errorUser, data: user } = useQuery<GetUserQuery>(GetUserQuery, { variables: { userId: userByEmail?.userByEmail?.id || "" } });

  if (loadingUser) {
    return <p>Loading...</p>;
  }

  return <>
    <AuthenticatedPageTitle title="ホーム" />
  </>
}