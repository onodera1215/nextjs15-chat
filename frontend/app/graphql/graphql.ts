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
  email?: InputMaybe<Scalars['String']['input']>;
  inviteeUserId: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
};

export type CreateInvitationPayload = {
  __typename?: 'CreateInvitationPayload';
  invitation: InvitationNode;
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

export type CreateRoomPayload = {
  __typename?: 'CreateRoomPayload';
  room: RoomNode;
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

export type InvitationNode = {
  __typename?: 'InvitationNode';
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  inviteeUserId: Scalars['ID']['output'];
  inviterUserId: Scalars['ID']['output'];
  roomId: Scalars['ID']['output'];
  usedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type JoinRoomInput = {
  /** 招待経由の場合に使う */
  invitationToken?: InputMaybe<Scalars['String']['input']>;
  roomId: Scalars['String']['input'];
  roomRoleId: RoomRole;
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

export type MessageConnection = {
  __typename?: 'MessageConnection';
  edges: Array<MessageEdge>;
  nodes: Array<MessageNode>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  cursor: Scalars['String']['output'];
  node: MessageNode;
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
  /** 招待用レコード作成 */
  createInvitation: CreateInvitationPayload;
  createMessage: CreateMessagePayload;
  /** ルーム新規作成 */
  createRoom: CreateRoomPayload;
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

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** ログインユーザーの情報を取得します */
  me: UserNode;
  messages: MessageConnection;
  /** 所属しているルーム一覧取得 */
  myRooms: RoomConnection;
  /** ユーザーが登録済みかどうかを判定します。 */
  registeredUser: RegisteredUserModel;
  /** ルーム取得 */
  room?: Maybe<RoomNode>;
  /** ルーム一覧取得 */
  rooms: RoomConnection;
  /** 指定したIDのユーザーを取得します。 */
  user: UserNode;
  /** 指定したemailを持つユーザーを取得します。 */
  userByEmail: UserNode;
  /** ユーザー一覧情報を取得します。 */
  users: UserConnection;
};


export type QueryMessagesArgs = {
  input: SearchMessagesInput;
};


export type QueryMyRoomsArgs = {
  input?: InputMaybe<SearchRoomOptionInput>;
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

export type RoomConnection = {
  __typename?: 'RoomConnection';
  edges: Array<RoomEdge>;
  nodes: Array<RoomNode>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RoomEdge = {
  __typename?: 'RoomEdge';
  cursor: Scalars['String']['output'];
  node: RoomNode;
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
  unreadCount: Scalars['Int']['output'];
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
  after?: InputMaybe<Scalars['String']['input']>;
  roomId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type SearchRoomOptionInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  roomId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** ユーザー検索オプション */
export type SearchUsersInput = {
  after?: InputMaybe<Scalars['String']['input']>;
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

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  nodes: Array<UserNode>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float']['output'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: UserNode;
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
  joinViaUserId?: Maybe<Scalars['String']['output']>;
  joinedAt: Scalars['DateTime']['output'];
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


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'UserNode', id: string, name: string, email: string, icon: string, oauthProvider: string, oauthProviderAccountId: string, status: UserStatus, createdAt: any, updatedAt: any } };

export type GetMessagesQueryVariables = Exact<{
  input: SearchMessagesInput;
}>;


export type GetMessagesQuery = { __typename?: 'Query', messages: { __typename?: 'MessageConnection', nodes: Array<{ __typename?: 'MessageNode', id: string, body: string, roomId: string, sender: { __typename?: 'UserNode', id: string, name: string, icon: string } }> } };

export type OnMessageCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnMessageCreatedSubscription = { __typename?: 'Subscription', messageCreated: { __typename?: 'MessageNode', id: string, body: string, roomId: string, senderId: string, createdAt: any, updatedAt: any, sender: { __typename?: 'UserNode', id: string, name: string, icon: string } } };

export type GetRoomsQueryVariables = Exact<{
  input?: InputMaybe<SearchRoomOptionInput>;
}>;


export type GetRoomsQuery = { __typename?: 'Query', rooms: { __typename?: 'RoomConnection', totalCount: number, edges: Array<{ __typename?: 'RoomEdge', cursor: string }>, nodes: Array<{ __typename?: 'RoomNode', id: string, name: string }> } };

export type GetUsersQueryVariables = Exact<{
  input: SearchUsersInput;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: { __typename?: 'UserConnection', nodes: Array<{ __typename?: 'UserNode', id: string, name: string, icon: string }> } };

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
    icon
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
    nodes {
      id
      body
      roomId
      sender {
        id
        name
        icon
      }
    }
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
    query GetRooms($input: SearchRoomOptionInput) {
  rooms(input: $input) {
    edges {
      cursor
    }
    nodes {
      id
      name
    }
    totalCount
  }
}
    `) as unknown as TypedDocumentString<GetRoomsQuery, GetRoomsQueryVariables>;
export const GetUsersDocument = new TypedDocumentString(`
    query GetUsers($input: SearchUsersInput!) {
  users(input: $input) {
    nodes {
      id
      name
      icon
    }
  }
}
    `) as unknown as TypedDocumentString<GetUsersQuery, GetUsersQueryVariables>;