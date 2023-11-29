import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String
    user: User!
  }

  type User {
    id: ID!
    username: String!
    passwordHash: String!
  }

  type Query {
    posts: [Post]
    post(id: ID!): Post
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createPost(title: String!, content: String): Post
    updatePost(id: ID!, title: String, content: String): Post
    deletePost(id: ID!): String
    createUser(username: String!, passwordHash: String!): User
    updateUser(id: ID!, username: String, passwordHash: String): User
    deleteUser(id: ID!): String
  }
`;
