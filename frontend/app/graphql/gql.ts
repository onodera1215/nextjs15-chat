/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\nmutation CreateMessage($input: CreateMessageInput!) {\n  createMessage(input: $input) {\n    id\n    body\n    roomId\n    senderId\n    createdAt\n    updatedAt\n  }\n}\n": typeof types.CreateMessageDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      name\n      email\n      oauthProvider\n      status\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  query RegisteredUser($input: RegisteredUserInput!) {\n    registeredUser(input: $input) {\n      isRegistered\n      isRegisteredInAnotherProvider\n    }\n  }\n": typeof types.RegisteredUserDocument,
    "\n          query GetMe {\n            me {\n              id\n              name\n              email\n              oauthProvider\n              oauthProviderAccountId\n              status\n              createdAt\n              updatedAt\n            }\n          }\n        ": typeof types.GetMeDocument,
    "\n          query GetRooms {\n            rooms {\n              id\n              name\n              description\n              status\n              createdAt\n              updatedAt\n            }\n          }\n        ": typeof types.GetRoomsDocument,
    "\n          query GetUsers {\n            users {\n              id\n              name\n              email\n              oauthProvider\n              oauthProviderAccountId\n              status\n              createdAt\n              updatedAt\n            }\n          }\n        ": typeof types.GetUsersDocument,
    "\n          query GetMessages($input: SearchMessagesInput!) {\n            messages(input: $input) {\n              id\n              body\n              roomId\n              senderId\n              sender {\n                id\n                name\n                icon\n              }\n              createdAt\n              updatedAt\n            }\n          }\n        ": typeof types.GetMessagesDocument,
    "\n          subscription OnMessageCreated {\n            messageCreated {\n              id\n              body\n              roomId\n              senderId\n              sender {\n                id\n                name\n                icon\n              }\n              createdAt\n              updatedAt\n            }\n          }\n        ": typeof types.OnMessageCreatedDocument,
};
const documents: Documents = {
    "\nmutation CreateMessage($input: CreateMessageInput!) {\n  createMessage(input: $input) {\n    id\n    body\n    roomId\n    senderId\n    createdAt\n    updatedAt\n  }\n}\n": types.CreateMessageDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      name\n      email\n      oauthProvider\n      status\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateUserDocument,
    "\n  query RegisteredUser($input: RegisteredUserInput!) {\n    registeredUser(input: $input) {\n      isRegistered\n      isRegisteredInAnotherProvider\n    }\n  }\n": types.RegisteredUserDocument,
    "\n          query GetMe {\n            me {\n              id\n              name\n              email\n              oauthProvider\n              oauthProviderAccountId\n              status\n              createdAt\n              updatedAt\n            }\n          }\n        ": types.GetMeDocument,
    "\n          query GetRooms {\n            rooms {\n              id\n              name\n              description\n              status\n              createdAt\n              updatedAt\n            }\n          }\n        ": types.GetRoomsDocument,
    "\n          query GetUsers {\n            users {\n              id\n              name\n              email\n              oauthProvider\n              oauthProviderAccountId\n              status\n              createdAt\n              updatedAt\n            }\n          }\n        ": types.GetUsersDocument,
    "\n          query GetMessages($input: SearchMessagesInput!) {\n            messages(input: $input) {\n              id\n              body\n              roomId\n              senderId\n              sender {\n                id\n                name\n                icon\n              }\n              createdAt\n              updatedAt\n            }\n          }\n        ": types.GetMessagesDocument,
    "\n          subscription OnMessageCreated {\n            messageCreated {\n              id\n              body\n              roomId\n              senderId\n              sender {\n                id\n                name\n                icon\n              }\n              createdAt\n              updatedAt\n            }\n          }\n        ": types.OnMessageCreatedDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateMessage($input: CreateMessageInput!) {\n  createMessage(input: $input) {\n    id\n    body\n    roomId\n    senderId\n    createdAt\n    updatedAt\n  }\n}\n"): typeof import('./graphql').CreateMessageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      name\n      email\n      oauthProvider\n      status\n      createdAt\n      updatedAt\n    }\n  }\n"): typeof import('./graphql').CreateUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RegisteredUser($input: RegisteredUserInput!) {\n    registeredUser(input: $input) {\n      isRegistered\n      isRegisteredInAnotherProvider\n    }\n  }\n"): typeof import('./graphql').RegisteredUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          query GetMe {\n            me {\n              id\n              name\n              email\n              oauthProvider\n              oauthProviderAccountId\n              status\n              createdAt\n              updatedAt\n            }\n          }\n        "): typeof import('./graphql').GetMeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          query GetRooms {\n            rooms {\n              id\n              name\n              description\n              status\n              createdAt\n              updatedAt\n            }\n          }\n        "): typeof import('./graphql').GetRoomsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          query GetUsers {\n            users {\n              id\n              name\n              email\n              oauthProvider\n              oauthProviderAccountId\n              status\n              createdAt\n              updatedAt\n            }\n          }\n        "): typeof import('./graphql').GetUsersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          query GetMessages($input: SearchMessagesInput!) {\n            messages(input: $input) {\n              id\n              body\n              roomId\n              senderId\n              sender {\n                id\n                name\n                icon\n              }\n              createdAt\n              updatedAt\n            }\n          }\n        "): typeof import('./graphql').GetMessagesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          subscription OnMessageCreated {\n            messageCreated {\n              id\n              body\n              roomId\n              senderId\n              sender {\n                id\n                name\n                icon\n              }\n              createdAt\n              updatedAt\n            }\n          }\n        "): typeof import('./graphql').OnMessageCreatedDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
