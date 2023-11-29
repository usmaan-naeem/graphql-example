import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphQl/schema";
import { User as UserType } from "../types/User";

const User = () => {
  const { loading, error, data } = useQuery<{ user: UserType }, { id: string }>(
    GET_USER,
    {
      variables: { id: "6565f2cd1ab5e2765a1c11ad" },
    }
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <h2>{data?.user.id}</h2>
      <p>{data?.user.username}</p>
    </div>
  );
};

export default User;
