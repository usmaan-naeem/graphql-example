import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      user {
        id
        username
      }
    }
  }
`;

export const SEARCH_POSTS_QUERY = gql`
  query SearchPosts($query: String!) {
    searchPosts(query: $query) {
      id
      title
      content
      user {
        id
        username
      }
    }
  }
`;


export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $content: String!, $userId: ID!) {
    createPost(title: $title, content: $content, userId: $userId) {
      id
      title
      content
      user {
        id
        username
      }
    }
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($id: ID!, $title: String!, $content: String!) {
    updatePost(id: $id, title: $title, content: $content) {
      id
      title
      content
      user {
        id,
        username
      }
    }
  }
`;
