import { useMutation } from "@apollo/client";
import PostForm from "../components/form/PostForm";
import { PostFormType } from "../types/Post";
import { CREATE_POST_MUTATION, UPDATE_POST_MUTATION } from "../graphQl/schema";

const CreatePost = () => {
  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const [updatePost] = useMutation(UPDATE_POST_MUTATION);

  const handleSave = (formData: PostFormType) => {
   
    try {
        if (formData.id) {
            updatePost({
              variables: {
                id: formData.id,
                title: formData.title,
                content: formData.content,
                userId: formData.userId,
              },
            });
          } else {
            createPost({
              variables: {
                title: formData.title,
                content: formData.content,
                userId: formData.userId,
              },
            });
          }
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <PostForm onSubmit={handleSave} existingPost={null} />
    </div>
  );
};

export default CreatePost;
