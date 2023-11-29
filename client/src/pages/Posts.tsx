import { useMutation } from "@apollo/client";
import Posts from "../components/Posts";
import PostForm from "../components/form/PostForm";
import { CREATE_POST_MUTATION, UPDATE_POST_MUTATION } from "../graphQl/schema";
import { PostFormType } from "../types/Post";
import SearchComponent from "../components/SearchComponent";

const PostsPage = () => {
  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    refetchQueries: ["GetPosts"],
  });
  const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
    refetchQueries: ["GetPosts"],
  });

  const handleSave = async (formData: PostFormType) => {
    try {
      if (formData.id) {
        await updatePost({
          variables: {
            id: formData.id,
            title: formData.title,
            content: formData.content,
            userId: formData.userId,
          },
        });
      } else {
        await createPost({
          variables: {
            title: formData.title,
            content: formData.content,
            userId: formData.userId,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 grid grid-cols-12 gap-4">
      <div className="col-span-6">
        <div>
          <h2>Create Post</h2>
          <PostForm onSubmit={handleSave} existingPost={null} />
        </div>
        <Posts />
      </div>
      <div className="col-span-6">
        <SearchComponent />
      </div>
    </div>
  );
};

export default PostsPage;
