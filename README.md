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
  - last/before: 後ろ方向ページング
  """
  myRooms(first: Int, after: String, last: Int, before: String): RoomConnection!

  """
  ルーム詳細
  - messages/members/readState は RoomNode のフィールドで取得
  """
  room(id: ID!): RoomNode
}

"""
========================
Mutation
========================
"""
type Mutation {
  """
  ユーザー作成
  - OAuthのみの運用なら、サインイン時に自動作成してこのMutation自体を消すのもアリ
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
  - invitationTokenなし：joinPolicy=OPEN のときのみ許可、など
  """
  joinRoom(input: JoinRoomInput!): JoinRoomPayload!

  """
  ルーム退室
  """
  leaveRoom(input: LeaveRoomInput!): LeaveRoomPayload!

  """
  既読更新（DBのlastReadAtに合わせる）
  - 推奨：lastReadAt は「画面で見えている最新メッセージの createdAt」を送る
  - 注意：クライアント時刻（new Date()）は使わない
  """
  markRoomRead(input: MarkRoomReadInput!): MarkRoomReadPayload!

  """
  招待トークン発行
  - inviteeUserId / inviteeEmail は任意（両方nullは弾く等のバリデーション推奨）
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
  - unreadCount はまず Query で算出が安全
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
  """
  OAuthのみなら不要になる可能性あり
  """
  email: String!
  name: String!
  icon: String
}

input CreateRoomInput {
  name: String!
  description: String
  joinPolicy: RoomJoinPolicy! = OPEN
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
  - 推奨：最新表示メッセージの createdAt を送る
  """
  lastReadAt: DateTime!
}

input CreateInvitationInput {
  roomId: ID!
  inviteeUserId: ID
  inviteeEmail: String
  expiresAt: DateTime
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
  """
  送信者の既読状態を同時に進める実装にする場合に便利
  """
  readState: RoomReadState
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
  joinPolicy: RoomJoinPolicy!
  status: RoomStatus!

  createdByUserId: ID!
  createdAt: DateTime!

  """
  参加メンバー（ページング）
  """
  members(
    first: Int
    after: String
    last: Int
    before: String
  ): UserRoomConnection!

  """
  メッセージ一覧（ページング）
  - チャットは通常「新しい順/古い順」を選びたくなるので orderBy を用意
  """
  messages(
    first: Int
    after: String
    last: Int
    before: String
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

  """
  InvitationとUserRoomをDBで直接結びつけてないので基本はnull
  （必要なら joinedViaInvitationId を持つ設計にすると解決）
  """
  joinedViaInvitation: InvitationNode
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
  まずは Query（myRooms/room）で算出するのが安全
  Subscriptionで厳密な unreadCount を配るのは順序/再接続でズレやすい
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

type RoomConnection {
  edges: [RoomEdge!]!
  nodes: [RoomNode!]!
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
enum RoomJoinPolicy {
  OPEN
  INVITE_ONLY
}

enum UserStatus {
  ACTIVE
  INACTIVE
}

enum RoomStatus {
  ACTIVE
  INACTIVE
}

enum MessageOrderBy {
  """
  新しい順（チャットのデフォルトにしがち）
  """
  CREATED_AT_DESC
  """
  古い順（スクロールで末尾に向かうUIなど）
  """
  CREATED_AT_ASC
}
```
