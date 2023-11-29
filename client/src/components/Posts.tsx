import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphQl/schema";
import { Post } from "../types/Post";

const Posts = () => {
  const { loading, error, data } = useQuery<{ posts: Post[] }>(GET_POSTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="my-4 text-left">
      {data?.posts?.length
        ? data?.posts.map((post: Post) => (
            <div key={post.id} className="border border-blue-chalk p-4 rounded mb-2">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>Author: {post.user.username}</p>
            </div>
          ))
        : null}
    </div>
  );
};

export default Posts;
