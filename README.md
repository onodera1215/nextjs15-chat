# Next.js を利用した chat アプリケーション開発

---

## ERD

最小限の要件を満たす ER 図

```mermaid
erDiagram
    users ||--o{ user_rooms : "has many"
    users ||--o{ messages : "has many"
    users ||--o{ message_reads : "has many"
    users {
        string id "uuid"
        string name "名前"
        Date created_at "登録日時"
        Date updated_at "更新日時"
    }

    user_rooms
    user_rooms {
        string user_id "ユーザーid"
        string room_id "ルームid"
        Date created_at "登録日時"
    }

    rooms ||--o{ user_rooms : "has many"
    rooms ||--o{ messages : "has many"
    rooms {
        string id "uuid"
        string name "ルーム名"
        string description "説明文"
        Date created_at "登録日時"
    }

    messages ||--o{ message_reads : "has many"
    messages {
        string id "uuid"
        string room_id "ルームid"
        string user_id "ユーザーid"
        string message "メッセージ"
        Date created_at "登録日時"
        Date updated_at "更新日時"
    }

    message_reads {
        string room_id "メッセージid"
        string user_id "ユーザーid"
        Date created_at "登録日時"
    }


```

## GraphQL

#### 型情報

```graphql
type CreateUserInput {
  name: String!
}

type User {
  id: String!
  name: String!
}

type createMessageInput {
  body: String!
  senderId: String!
}

type Message {
  id: String!
  body: String!
  sender: User!
  readUsers: [User]!
}

type SearchOption {
  offset: Int!
  limit: Int!
}

type MessageRead {
  userId: String!
  messageId: String!
  readAt: Date!
}

type CreateMessageRead {
  userId: String!
  messageId: String!
  readAt: Date!
}
```

### ミューテーション

#### ユーザー登録

```graphql
mutation createUser(createUserInput: CreateUserInput!): User!
```

#### 既読情報登録

```graphql
mutation createMessageRead(createMessageReadInput: CreateMessageReadInput!): MessageRead!
```

#### メッセージ登録

```graphql
mutation createMessage(createMessageInput: CreateMessageInput): Message!
```

### クエリ

#### メッセージ取得

```graphql
query messages(searchOption: SearchOption!): [Message]!
```

### サブスクリプション

#### メッセージ取得

```graphql
subscription messageAdded(roomId: String!): Message!
```

#### 既読情報取得

```graphql
subscription messageRead(roomId: String!): MessageRead!
```
