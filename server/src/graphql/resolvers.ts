import esClient from "../elastic/client";
import Post from "../models/Post";
import User from "../models/User";
import { Post as PostType, SearchHits } from "../types/post";
import { User as UserType } from "../types/user";

export const resolvers = {
  Query: {
    async posts(): Promise<PostType[]> {
      return await Post.find({}).populate("user");
    },
    async post(_: unknown, args: { id: string }): Promise<PostType | null> {
      const post = await Post.findById(args.id).populate("user");
      if (!post) return null;

      return {
        id: post._id.toString(),
        title: post.title,
        content: post.content || "",
      };
    },

    async searchPosts(_: unknown, { query }: {query: string}) {
      const response = await esClient.search<SearchHits>({
        index: 'posts',
        body: {
          query: {
            multi_match: {
              query,
              fields: ['title', 'content']
            }
          }
        }
      });

      const postIds = response.hits.hits.map(hit => hit._id);
      
      // Fetch the complete post details from MongoDB using the IDs
      const posts = await Post.find({
        '_id': { $in: postIds }
      }).populate('user');

      return posts;
    },

    async users(): Promise<UserType[]> {
      return await User.find({}).populate("posts");
    },

    async user(_: unknown, args: { id: string }): Promise<UserType | null> {
      const user = await User.findById(args.id).populate("posts");
      if (!user) return null;

      return {
        id: user._id.toString(),
        username: user.username,
        passwordHash: user.passwordHash || "",
        posts: user.posts.map((post) => post._id.toString()),
      };
    },
  },
  Mutation: {
    async createPost(
      _: unknown,
      args: { userId: string; title: string; content: string }
    ): Promise<PostType> {
      const newPost = new Post({
        ...args,
        user: args.userId,
      });
      await newPost.save();

      // Index in Elasticsearch
      await esClient.index({
        index: "posts",
        id: newPost._id.toString(),
        body: {
          title: args.title,
          content: args.content,
          userId: args.userId,
        },
      });

      // Optionally populate the user data
      await newPost.populate("user");
      return newPost;
    },
    async updatePost(
      _: unknown,
      args: { id: string; title?: string; content?: string }
    ): Promise<PostType | null> {
      const post = await Post.findByIdAndUpdate(args.id, args, { new: true });

      // Update post in Elasticsearch
      await esClient.update({
        index: "posts",
        id: args.id,
        body: {
          doc: args,
        },
      });

      return post;
    },
    async deletePost(_: unknown, args: { id: string }): Promise<string> {
      await Post.findByIdAndDelete(args.id);
      // Delete post in Elasticsearch
      await esClient.delete({
        index: "posts",
        id: args.id,
      });
      return "Post deleted";
    },

    async createUser(
      _: unknown,
      args: { username: string; passwordHash: string }
    ): Promise<UserType> {
      const newUser = new User(args);
      await newUser.save();
      return {
        id: newUser._id.toString(),
        username: newUser.username,
        passwordHash: newUser.passwordHash || "",
      };
    },

    async updateUser(
      _: unknown,
      args: { id: string; username?: string; passwordHash?: string }
    ): Promise<UserType | null> {
      return await User.findByIdAndUpdate(args.id, args, { new: true });
    },
  },
};
