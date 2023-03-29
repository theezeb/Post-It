"use client";

import { PostType } from "@/app/types/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Post from "./../../components/Posts";
import AddComment from "../../components/AddComment";
import Image from "next/image";
import { motion } from "framer-motion";
import moment from "moment";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const res = await axios.get(`/api/posts/${slug}`);
  return res.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType[]>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });

  if (isLoading || !data) return "isLoading...";
  console.log(data);

  return (
    <div>
      <Post
        id={data.id}
        name={data.user.name}
        avatar={data.user.image}
        postTitle={data.title}
        comments={data.Comments}
        date={data.createdAt}
        hearts={data.hearts}
        userId={data.userId}
      />
      <AddComment id={data.id} />
      {data?.Comments.map((comment:any) => (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ ease: "easeOut" }}
          className="my-6 bg-white p-8 rounded-md border-solid border-2 border-gray-700"
          key={comment.id}
        >
          <div className="flex items-center gap-4 ">
            <Image
              width={30}
              height={30}
              src={comment.user?.image}
              className="rounded-xl"
              alt="avatar"
            />
            <div className="flex flex-col ">
              <h3 className="font-bold pb-2">{comment?.user?.name}</h3>
              <h2 className="text-sm bg-gray-200 rounded-md px-1">
                {moment(comment.createdAt).format("MMMM Do YYYY")}
              </h2>
            </div>
          </div>
          <div className="mt-9">{comment.message}</div>
        </motion.div>
      ))}
    </div>
  );
}
