import Post from "../models/Post.js";
import User from "../models/User.js";
export const resolvers = {
    Query: {
        async posts() {
            return await Post.find({}).populate('user');
        },
        async post(_, args) {
            const post = await Post.findById(args.id).populate("user");
            if (!post)
                return null;
            return {
                id: post._id.toString(),
                title: post.title,
                content: post.content || "",
            };
        },
        async users() {
            return await User.find({}).populate("posts");
        },
        async user(_, args) {
            const user = await User.findById(args.id).populate("posts");
            if (!user)
                return null;
            return {
                id: user._id.toString(),
                username: user.username,
                passwordHash: user.passwordHash || "",
                posts: user.posts.map((post) => post._id.toString()),
            };
        },
    },
    Mutation: {
        async createPost(_, args) {
            const newPost = new Post({
                ...args,
                user: args.userId,
            });
            await newPost.save();
            // Optionally populate the user data
            await newPost.populate('user');
            return newPost.toObject();
        },
        async updatePost(_, args) {
            return await Post.findByIdAndUpdate(args.id, args, { new: true });
        },
        async deletePost(_, args) {
            await Post.findByIdAndDelete(args.id);
            return "Post deleted";
        },
        async createUser(_, args) {
            const newUser = new User(args);
            await newUser.save();
            return {
                id: newUser._id.toString(),
                username: newUser.username,
                passwordHash: newUser.passwordHash || "",
            };
        },
        async updateUser(_, args) {
            return await User.findByIdAndUpdate(args.id, args, { new: true });
        }
    },
};
