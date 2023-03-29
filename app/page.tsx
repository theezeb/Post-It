"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddPost from "./components/AddPost";
import Post from "./components/Posts";
import { AuthPosts } from "./types/AuthPosts";
import { PostType } from "./types/Posts";

//fetch all posts
const fetchAllPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

const fetchCurrentUser = async () => {
  const res = await axios.get("/api/posts/getCurrentUser");
  return res.data;
};

export default function Home() {
  const queryMultiple = () => {
    const res1 = useQuery<PostType>({
      queryFn: fetchAllPosts,
      queryKey: ["posts"],
    });
    const res2 = useQuery<AuthPosts>({
      queryFn: fetchCurrentUser,
      queryKey: ["auth-posts"],
    });
    return [res1, res2];
  };

  const [{ isLoading, data, error }, { data: userData, error: userError }] =
    queryMultiple();
    
  if (error) return error;
  if (userError) return userError;
  if (isLoading || !data || !userData) return "Loading...";

  return (
    <main>
      <AddPost name={userData ? userData?.name : ""} />
      {data.map((post: any) => (
        <Post
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
          date={post.createdAt}
          hearts={post.hearts}
          userId={userData.id}
          comments={post.Comments}
        />
      ))}
    </main>
  );
}
