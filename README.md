# Next.js を利用した chat アプリケーション開発

---

## ERD

```mermaid
erDiagram

  User {
    string   id
    string   oauthProvider
    string   oauthProviderAccountId
    string   email
    string   name
    string   icon
    UserStatus status
    datetime createdAt
    datetime updatedAt
  }

  Room {
    string   id
    string   name
    string   description
    RoomStatus status
    string   createdByUserId
    datetime createdAt
    datetime updatedAt
  }

  UserRoom {
    string   roomId
    string   userId
    string   roomRoleId
    string   joinedViaUserId
    datetime createdAt
    datetime updatedAt
  }

  Invitation {
    string   id
    string   roomId
    string   inviterUserId
    string   inviteeUserId
    string   email
    string   token
    datetime expiresAt
    datetime createdAt
    datetime usedAt
    datetime updatedAt
  }

  Role {
    string   id
    string   name
    RoleScope scope
    datetime createdAt
    datetime updatedAt
  }

  RolePolicy {
    string      id
    string      roleId
    PolicyAction action
    ResourceType resource
    datetime    createdAt
    datetime    updatedAt
  }

  Message {
    string   id
    string   body
    string   senderId
    string   roomId
    datetime createdAt
    datetime updatedAt
  }

  RoomRead {
    string   id
    string   roomId
    string   userId
    datetime lastReadAt
    datetime createdAt
    datetime updatedAt
  }

  %% ==========================
  %% Relations
  %% ==========================

  %% ルーム作成
  User ||--o{ Room : "作成 (作成ユーザーIDが記録される)"

  %% ルーム参加済みユーザー
  User ||--o{ UserRoom : "メンバー (userId)"
  Room ||--o{ UserRoom : "ルーム (roomId)"

  %% 誰に招待されたか
  User ||--o{ UserRoom : "joinedViaUserIdに招待された"

  %% ユーザーのルーム内ロール
  Role ||--o{ UserRoom : "ルーム内でのロール"

  %% Role policies
  Role ||--o{ RolePolicy : "ロールに紐づくポリシー"

  %% 招待情報
  Room ||--o{ Invitation : "has"
  User ||--o{ Invitation : "招待する (inviterUserId)"
  User ||--o{ Invitation : "招待者 (inviteeUserId)"

  %% メッセージ
  User ||--o{ Message : "送信 (senderId)"
  Room ||--o{ Message : "ルーム内メッセージ (roomId)"

  %% 既読管理
  User ||--o{ RoomRead : "誰が読んだか (userId)"
  Room ||--o{ RoomRead : "どのルームを見たか (roomId)"

```

## GraphQL

### グラフモデル

```mermaid
graph TD
  User
  Message
  Room

  User <--> Message
  User <--> Room
  Message <-->Room
```

### ノードとエッジについて

図の関係にある

```mermaid
graph TD
  NodeA
  NodeB


  NodeA <--> |Edge|NodeB
```

## GraphQL 設計一覧

```graphql
"""
========================
Connection 共通
========================
"""
type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}

"""
========================
Query
========================
"""
type Query {
  """
  ログイン中ユーザー情報
  """
  me: UserNode!

  """
  自分が参加しているルーム一覧（ページング）
  - first/after: 前方向ページング
  """
  myRooms(first: Int, after: String): RoomConnection!

  """
  ルーム詳細
  - messages/members/readState は RoomNode のフィールドで取得
  """
  room(id: ID!): RoomNode

  """
  メッセージ一覧
  """
  messages(
    searchOptions: MessageSearchOptions
    order: Order
  ): MessageConnection!

  """
  ユーザー一覧
  """
  users(searchOptions: UserSearchOptions, order: Order): UserConnection!
}

"""
========================
Mutation
========================
"""
type Mutation {
  """
  ユーザー作成
  """
  createUser(input: CreateUserInput!): CreateUserPayload!

  """
  ルーム作成（作成者はオーナーになる想定）
  """
  createRoom(input: CreateRoomInput!): CreateRoomPayload!

  """
  メッセージ送信
  """
  createMessage(input: CreateMessageInput!): CreateMessagePayload!

  """
  ルーム参加
  - invitationTokenあり：招待リンク経由（期限・使用済みなど検証）
  """
  joinRoom(input: JoinRoomInput!): JoinRoomPayload!

  """
  ルーム退室
  """
  leaveRoom(input: LeaveRoomInput!): LeaveRoomPayload!

  """
  既読更新（DBのlastReadAtに合わせる）
  """
  markRoomRead(input: MarkRoomReadInput!): MarkRoomReadPayload!

  """
  招待トークン発行
  - inviteeUserId / inviteeEmail は任意（両方nullは弾く等のバリデーション実施）
  """
  createInvitation(input: CreateInvitationInput!): CreateInvitationPayload!
}

"""
========================
Subscription
========================
"""
type Subscription {
  """
  メッセージ追加イベント
  """
  messageAdded(roomId: ID!): MessageNode!

  """
  ルーム参加イベント
  """
  roomMemberAdded(roomId: ID!): UserRoomNode!

  """
  既読更新イベント
  - 最低限 roomId / userId / lastReadAt を流す
  - unreadCount は Query で算出が安全
  """
  roomReadUpdated(roomId: ID!): RoomReadState!

  """
  ルーム作成イベント（任意：ルーム一覧をリアルタイム更新したい場合）
  """
  roomAdded: RoomNode!
}

"""
========================
Inputs
========================
"""
input CreateUserInput {
  email: String!
  name: String!
  icon: String
  oauthProvider: string!
  oauthProviderAccountId: string!
}

input CreateRoomInput {
  name: String!
  description: String
  status: RoomStatus!
}

input CreateMessageInput {
  roomId: ID!
  body: String!
}

input JoinRoomInput {
  roomId: ID!
  """
  招待リンク経由の場合のみ指定
  """
  invitationToken: String
}

input LeaveRoomInput {
  roomId: ID!
}

input MarkRoomReadInput {
  roomId: ID!
  """
  最終既読時刻（単調増加させる）
  """
  lastReadAt: DateTime!
}

input CreateInvitationInput {
  roomId: ID!
  inviteeUserId: ID
  inviteeEmail: String
  expiresAt: DateTime
}

input MessageSearchOption {
  roomId: ID
  userId: ID
  keyword: String
}

input UserSearchOption {
  roomId: ID
  userId: ID
  keyword: String
}

"""
========================
Payloads（Mutationの戻り値）
========================
"""
type CreateUserPayload {
  user: UserNode!
}

type CreateRoomPayload {
  room: RoomNode!
}

type CreateMessagePayload {
  message: MessageNode!
}

type JoinRoomPayload {
  membership: UserRoomNode!
  room: RoomNode!
}

type LeaveRoomPayload {
  roomId: ID!
  userId: ID!
}

type MarkRoomReadPayload {
  readState: RoomReadState!
}

type CreateInvitationPayload {
  invitation: InvitationNode!
  inviteLink: String!
}

"""
========================
Node types
========================
"""
type UserNode {
  id: ID!
  name: String!
  email: String!
  icon: String
  status: UserStatus!
  createdAt: DateTime!
}

type RoomNode {
  id: ID!
  name: String!
  description: String
  status: RoomStatus!
  createdByUserId: ID!
  createdAt: DateTime!

  """
  参加メンバー（ページング）
  """
  members(first: Int, after: String): UserRoomConnection!

  """
  メッセージ一覧（ページング）
  - 「新しい順/古い順」を選びたくなったら使う orderBy を用意
  """
  messages(
    first: Int
    after: String
    orderBy: MessageOrderBy = CREATED_AT_DESC
  ): MessageConnection!

  """
  自分の既読状態（非メンバーならnull）
  """
  readState: RoomReadState
}

type UserRoomNode {
  userId: ID!
  roomId: ID!

  """
  ルーム権限（Role.name をそのまま返す想定）
  例：ROOM_OWNER / ROOM_MEMBER / ROOM_READONLY
  """
  role: String!

  joinedAt: DateTime!
  joinedViaUserId: ID
}

type InvitationNode {
  id: ID!
  roomId: ID!
  inviterUserId: ID!
  inviteeUserId: ID
  email: String!
  token: String!
  expiresAt: DateTime
  usedAt: DateTime
  createdAt: DateTime!
}

type MessageNode {
  id: ID!
  roomId: ID!
  userId: ID!
  body: String!
  createdAt: DateTime!
}

type RoomReadState {
  roomId: ID!
  userId: ID!
  lastReadAt: DateTime
  """
  Query（myRooms/room）で算出するのが安全
  """
  unreadCount: Int
}

"""
========================
Connection 定義
========================
"""
type RoomEdge {
  cursor: String!
  node: RoomNode!
}

type UserEdge {
  cursor: String!
  node: RoomNode!
}

type MessageEdge {
  cursor: String!
  node: RoomNode!
}

type RoomConnection {
  edges: [RoomEdge!]!
  nodes: [RoomNode!]!
  pageInfo: PageInfo!
  totalCount: Int
}

type UserConnection {
  edges: [UserEdge]!
  nodes: [UserNode]!
  pageInfo: PageInfo!
  totalCount: Int
}

type MessageConnection {
  edges: [MessageEdge]!
  nodes: [MessageNode]!
  pageInfo: PageInfo!
  totalCount: Int
}

type UserRoomEdge {
  cursor: String!
  node: UserRoomNode!
}

type UserRoomConnection {
  edges: [UserRoomEdge!]!
  nodes: [UserRoomNode!]!
  pageInfo: PageInfo!
  totalCount: Int
}

type MessageEdge {
  cursor: String!
  node: MessageNode!
}

type MessageConnection {
  edges: [MessageEdge!]!
  nodes: [MessageNode!]!
  pageInfo: PageInfo!
  totalCount: Int
}

"""
========================
Enums
========================
"""
enum UserStatus {
  ACTIVE
  INACTIVE
}

enum RoomStatus {
  ACTIVE
  INACTIVE
}

enum OrderBy {
  CREATED_AT_DESC
  CREATED_AT_ASC
}
```
