import React, { useState, useEffect } from "react";
import { PostFormProps, PostFormType } from "../../types/Post";

const PostForm: React.FC<PostFormProps> = ({ existingPost, onSubmit }) => {
  const [formData, setFormData] = useState<PostFormType>({
    id: "",
    title: "",
    content: "",
    userId: "6565f33d1ab5e2765a1c11af",
  });

  useEffect(() => {
    if (existingPost) {
      setFormData({
        id: existingPost.id,
        title: existingPost.title,
        content: existingPost.content,
        userId: existingPost.user.id,
      });
    }
  }, [existingPost]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="text-left">
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="text-sm font-normal w-full border border-blue-chalk rounded py-2 px-4 mb-3 focus:outline-none focus:ring-0"
        />
      </div>
      <div>
        <label className="text-md font-medium text-left">Content:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={5}
          className="text-sm font-normal w-full border border-blue-chalk rounded py-2 px-4 mb-3 focus:outline-none focus:ring-0"
        />
      </div>
      <button type="submit" className="py-2 px-4 bg-blue-500 rounded text-white">
        {existingPost ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
