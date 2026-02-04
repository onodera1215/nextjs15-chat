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

export type CreateInvitationInput = {
  expiresAt: Scalars['DateTime']['input'];
  /** 招待を受け取るユーザーのメールアドレス */
  inviteeEmail?: InputMaybe<Scalars['String']['input']>;
  inviteeUserId: Scalars['ID']['input'];
  roomId: Scalars['String']['input'];
};

export type CreateInvitationPayload = {
  __typename?: 'CreateInvitationPayload';
  expiresAt: Scalars['DateTime']['output'];
  /** 招待を受け取るユーザーのメールアドレス */
  inviteeEmail?: Maybe<Scalars['String']['output']>;
  /** 招待したユーザーのユーザーID */
  inviteeUserId: Scalars['ID']['output'];
  roomId: Scalars['String']['output'];
};

export type CreateMessageInput = {
  body: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
};

export type CreateMessagePayload = {
  __typename?: 'CreateMessagePayload';
  message: MessageNode;
};

export type CreateRoomInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: RoomStatusEnum;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  name: Scalars['String']['input'];
  oauthProvider: Scalars['String']['input'];
  oauthProviderAccountId: Scalars['String']['input'];
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  user: UserNode;
};

export type JoinRoomInput = {
  /** 招待経由の場合に使う */
  invitationToken?: InputMaybe<Scalars['String']['input']>;
  roomId: Scalars['String']['input'];
};

export type JoinRoomPayload = {
  __typename?: 'JoinRoomPayload';
  membership: UserRoomNode;
  room: RoomNode;
};

export type LeaveRoomInput = {
  roomId: Scalars['String']['input'];
};

export type LeaveRoomPayload = {
  __typename?: 'LeaveRoomPayload';
  room: RoomNode;
};

export type MarkRoomReadInput = {
  /** 最終既読日時（単調増加） */
  lastReadAt?: InputMaybe<Scalars['DateTime']['input']>;
  roomId: Scalars['String']['input'];
};

export type MarkRoomReadPayload = {
  __typename?: 'MarkRoomReadPayload';
  readState: RoomReadState;
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
  /** 招待トークン発行 */
  createInvitation: CreateInvitationPayload;
  createMessage: CreateMessagePayload;
  /** ルーム新規作成 */
  createRoom: RoomNode;
  /** ユーザー新規作成 */
  createUser: CreateUserPayload;
  /** ルーム参加 */
  joinRoom: JoinRoomPayload;
  /** ルームメンバー退会 */
  leaveRoom: LeaveRoomPayload;
  /** 既読処理実行 */
  markRoomRead: MarkRoomReadPayload;
};


export type MutationCreateInvitationArgs = {
  input: CreateInvitationInput;
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


export type MutationJoinRoomArgs = {
  input: JoinRoomInput;
};


export type MutationLeaveRoomArgs = {
  input: LeaveRoomInput;
};


export type MutationMarkRoomReadArgs = {
  input: MarkRoomReadInput;
};

export type Query = {
  __typename?: 'Query';
  /** ログインユーザーの情報を取得します */
  me: UserNode;
  messages: Array<MessageNode>;
  /** ユーザーが登録済みかどうかを判定します。 */
  registeredUser: RegisteredUserModel;
  /** ルーム取得 */
  room: RoomNode;
  /** ルーム一覧取得 */
  rooms: Array<RoomNode>;
  /** 指定したIDのユーザーを取得します。 */
  user: UserNode;
  /** 指定したemailを持つユーザーを取得します。 */
  userByEmail: UserNode;
  /** ユーザー一覧情報を取得します。 */
  users: Array<UserNode>;
};


export type QueryMessagesArgs = {
  input: SearchMessagesInput;
};


export type QueryRegisteredUserArgs = {
  input: RegisteredUserInput;
};


export type QueryRoomArgs = {
  id: Scalars['String']['input'];
};


export type QueryRoomsArgs = {
  input?: InputMaybe<SearchRoomOptionInput>;
};


export type QueryUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  input?: InputMaybe<SearchUsersInput>;
};

export type RegisteredUserInput = {
  oauthProvider: Scalars['String']['input'];
  oauthProviderAccountId: Scalars['String']['input'];
};

export type RegisteredUserModel = {
  __typename?: 'RegisteredUserModel';
  isRegistered: Scalars['Boolean']['output'];
  isRegisteredInAnotherProvider: Scalars['Boolean']['output'];
  user?: Maybe<UserNode>;
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

export type RoomReadState = {
  __typename?: 'RoomReadState';
  lastReadAt: Scalars['DateTime']['output'];
  roomId: Scalars['ID']['output'];
  /** 未読メッセージ数(厳密な数はqueryで取得すること) */
  unreadCount: Scalars['Float']['output'];
  userId: Scalars['ID']['output'];
};

export enum RoomRole {
  RoomMember = 'ROOM_MEMBER',
  RoomOwner = 'ROOM_OWNER'
}

/** ルームステータス */
export enum RoomStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

/** クエリ検索用オプション */
export type SearchMessagesInput = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  roomId?: InputMaybe<Scalars['String']['input']>;
};

export type SearchRoomOptionInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  roomId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

/** ユーザー検索オプション */
export type SearchUsersInput = {
  /** メールアドレスで部分一致検索 */
  email?: InputMaybe<Scalars['String']['input']>;
  /** 名前で部分一致検索 */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageCreated: MessageNode;
  roomCreated: RoomNode;
  userSignedUp: UserNode;
};

export type UserNode = {
  __typename?: 'UserNode';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  oauthProvider: Scalars['String']['output'];
  oauthProviderAccountId: Scalars['String']['output'];
  status: UserStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserRoomNode = {
  __typename?: 'UserRoomNode';
  joinedAt: Scalars['DateTime']['output'];
  leftViaUserId?: Maybe<Scalars['String']['output']>;
  role: RoomRole;
  roomId: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

/** ユーザーステータス */
export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'CreateMessagePayload', message: { __typename?: 'MessageNode', id: string, body: string, roomId: string, senderId: string, createdAt: any, updatedAt: any } } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserPayload', user: { __typename?: 'UserNode', id: string, name: string, email: string, oauthProvider: string, status: UserStatus, createdAt: any, updatedAt: any } } };

export type RegisteredUserQueryVariables = Exact<{
  input: RegisteredUserInput;
}>;


export type RegisteredUserQuery = { __typename?: 'Query', registeredUser: { __typename?: 'RegisteredUserModel', isRegistered: boolean, isRegisteredInAnotherProvider: boolean, user?: { __typename?: 'UserNode', id: string } | null } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'UserNode', id: string, name: string, email: string, oauthProvider: string, oauthProviderAccountId: string, status: UserStatus, createdAt: any, updatedAt: any } };

export type GetMessagesQueryVariables = Exact<{
  input: SearchMessagesInput;
}>;


export type GetMessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'MessageNode', id: string, body: string, roomId: string, senderId: string, createdAt: any, updatedAt: any, sender: { __typename?: 'UserNode', id: string, name: string, icon: string } }> };

export type OnMessageCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnMessageCreatedSubscription = { __typename?: 'Subscription', messageCreated: { __typename?: 'MessageNode', id: string, body: string, roomId: string, senderId: string, createdAt: any, updatedAt: any, sender: { __typename?: 'UserNode', id: string, name: string, icon: string } } };

export type GetRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRoomsQuery = { __typename?: 'Query', rooms: Array<{ __typename?: 'RoomNode', id: string, name: string, description: string, status: RoomStatusEnum, createdAt: any, updatedAt: any }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'UserNode', id: string, name: string, email: string, oauthProvider: string, oauthProviderAccountId: string, status: UserStatus, createdAt: any, updatedAt: any }> };

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

export const CreateMessageDocument = new TypedDocumentString(`
    mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    message {
      id
      body
      roomId
      senderId
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<CreateMessageMutation, CreateMessageMutationVariables>;
export const CreateUserDocument = new TypedDocumentString(`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      id
      name
      email
      oauthProvider
      status
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<CreateUserMutation, CreateUserMutationVariables>;
export const RegisteredUserDocument = new TypedDocumentString(`
    query RegisteredUser($input: RegisteredUserInput!) {
  registeredUser(input: $input) {
    isRegistered
    isRegisteredInAnotherProvider
    user {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<RegisteredUserQuery, RegisteredUserQueryVariables>;
export const GetMeDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<GetMeQuery, GetMeQueryVariables>;
export const GetMessagesDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<GetMessagesQuery, GetMessagesQueryVariables>;
export const OnMessageCreatedDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<OnMessageCreatedSubscription, OnMessageCreatedSubscriptionVariables>;
export const GetRoomsDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<GetRoomsQuery, GetRoomsQueryVariables>;
export const GetUsersDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<GetUsersQuery, GetUsersQueryVariables>;