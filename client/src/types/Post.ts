import { User } from "./User";

interface BasePost {
  id: string;
  title: string;
  content: string;
}

export interface Post extends BasePost {
  user: User;
}

export interface PostFormType extends BasePost {
  userId: string;
}

export interface PostFormProps {
  existingPost: Post | null;
  onSubmit: (form: PostFormType) => void;
}
