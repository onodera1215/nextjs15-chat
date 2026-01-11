'use client';

import AuthenticatedPageTitle from "@/components/atoms/AuthenticatedPageTitle";
import { GetRoomsQuery, GetUserByEmailQuery, GetUserQuery } from "@/graphql/graphql";
import { AppDispatch } from "@/store";
import { subscribeSignInThunk } from "@/store/entity/entitySlice";
import { useQuery } from "@apollo/client/react";
import gql from "graphql-tag";
import { useSession } from 'next-auth/react';
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const GetRoomsQueryDocument = gql`
  query GetRooms($input: SearchRoomOptionInput) {
    rooms(input: $input) {
      id
      name
    }
  }
`;

const GetUserByEmailQueryDocument = gql`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
    }
  }
`;

const GetUserQueryDocument = gql`
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

  const { data: rooms } = useQuery<GetRoomsQuery>(GetRoomsQueryDocument);
  const { data: userByEmail } = useQuery<GetUserByEmailQuery>(GetUserByEmailQueryDocument, { variables: { email: session?.data?.user?.email } });
  const { loading: loadingUser, error: errorUser, data: user } = useQuery<GetUserQuery>(GetUserQueryDocument, { variables: { userId: userByEmail?.userByEmail?.id || "" } });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const promise = dispatch(subscribeSignInThunk())
    return () => {
      promise.abort();
    };
  }, [dispatch, user]);

  if (loadingUser) {
    return <p>Loading...</p>;
  }


  return <>
    <AuthenticatedPageTitle title="ホーム" />
  </>
}