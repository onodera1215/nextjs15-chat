/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateMessageInput = {
  body: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};

export type CreateRoomInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: RoomStatusEnum;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  oauthProviderId: Scalars['String']['input'];
};

export type IsRegisteredUserInput = {
  email: Scalars['String']['input'];
  oauthProviderId: Scalars['String']['input'];
};

export type MessageNode = {
  __typename?: 'MessageNode';
  body: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  room: RoomNode;
  roomId: Scalars['String']['output'];
  sender: UserNode;
  senderId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMessage: MessageNode;
  createRoom: RoomNode;
  createUser: UserNode;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreateRoomArgs = {
  input: CreateRoomInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  /** ユーザーが登録済みかどうかを判定します。 */
  isRegisteredUser: Scalars['Boolean']['output'];
  messages: Array<MessageNode>;
  rooms: Array<RoomNode>;
};


export type QueryIsRegisteredUserArgs = {
  input: IsRegisteredUserInput;
};


export type QueryMessagesArgs = {
  input: SearchOptionInput;
};


export type QueryRoomsArgs = {
  input: SearchRoomOptionInput;
};

export type RoomNode = {
  __typename?: 'RoomNode';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: RoomStatusEnum;
  updatedAt: Scalars['DateTime']['output'];
};

/** ルームステータス */
export enum RoomStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

/** クエリ検索用オプション */
export type SearchOptionInput = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  roomId: Scalars['String']['input'];
};

export type SearchRoomOptionInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  roomId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageCreated: MessageNode;
};

export type UserNode = {
  __typename?: 'UserNode';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  oauthProviderId: Scalars['String']['output'];
  status: UserStatus;
  updatedAt: Scalars['DateTime']['output'];
};

/** ユーザーステータス */
export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type GetRoomsQueryVariables = Exact<{
  input: SearchRoomOptionInput;
}>;


export type GetRoomsQuery = { __typename?: 'Query', rooms: Array<{ __typename?: 'RoomNode', id: string, name: string }> };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserNode', id: string, name: string, email: string, oauthProviderId: string, status: UserStatus, createdAt: any, updatedAt: any } };

export type IsRegisteredUserQueryVariables = Exact<{
  input: IsRegisteredUserInput;
}>;


export type IsRegisteredUserQuery = { __typename?: 'Query', isRegisteredUser: boolean };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const GetRoomsDocument = new TypedDocumentString(`
    query GetRooms($input: SearchRoomOptionInput!) {
  rooms(input: $input) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<GetRoomsQuery, GetRoomsQueryVariables>;
export const CreateUserDocument = new TypedDocumentString(`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
    oauthProviderId
    status
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<CreateUserMutation, CreateUserMutationVariables>;
export const IsRegisteredUserDocument = new TypedDocumentString(`
    query IsRegisteredUser($input: IsRegisteredUserInput!) {
  isRegisteredUser(input: $input)
}
    `) as unknown as TypedDocumentString<IsRegisteredUserQuery, IsRegisteredUserQueryVariables>;