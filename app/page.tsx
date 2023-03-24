"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddPost from "./components/AddPost";
import Post from "./components/Posts";
import { PostType } from "./types/Posts";

type Data = {
  data: Array<any>;
};
//fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[], Data>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });

  if (error) return error;
  if (isLoading) return "Loading...";

  let currUserName = data[1].name;

  return (
    <main>
      <AddPost name={currUserName} />
      {data[0]?.map((post) => (
        <Post
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
          date={post.createdAt}
          hearts={post.hearts}
          userId={data[1].id}
          comments={post.Comments}
        />
      ))}
    </main>
  );
}
