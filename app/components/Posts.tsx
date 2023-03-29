"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";

type ShowPosts = {
  id: string;
  avatar: string;
  postTitle: string;
  name: string;
  date: string;
  hearts: { id: string; postId: string; userId: string }[];
  userId: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function Post({
  avatar,
  postTitle,
  name,
  id,
  date,
  hearts,
  userId,
  comments,
}: ShowPosts) {
  const currentUserLiked =
    hearts?.some((like) => like.userId === userId) || false;
  const queryClient = useQueryClient();
  let deleteLikeID: string;

  const { mutate } = useMutation(
    (id: string) => axios.post("/api/posts/addLike", { postId: id }),
    {
      onError: (e) => {
        console.log(e);
        toast.error("Please Login to Like this Post", { id: deleteLikeID });
      },
      onSuccess: (data) => {
        toast.success(
          `${
            currentUserLiked
              ? "Like has been removed "
              : " You have Liked the post"
          } 🔥`,
          { id: deleteLikeID }
        );
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["detail-post"]);
      },
    }
  );

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
      key={comments?.userId}
    >
      <div className="bg-white my-5 p-5 rounded-lg border-solid border-2 border-gray-700">
        <div className="flex items-center">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <div className=" items-centers font-bold px-2 text-gray-700">
            {name}
          </div>
          <div className="ml-auto bg-gray-200 rounded-lg py-1 px-1">
            {moment(date).format("MMMM Do YYYY, h:mm a")}
          </div>
        </div>
        <div className="my-8">
          <p className="break-all">{postTitle}</p>
        </div>
        <div className="flex gap-4 justify-between cursor-pointer items-center">
          <Link href={`/post/${id}`}>
            <p className="text-sm font-bold text-gray-700">
              {comments?.length} Comments
            </p>
          </Link>
          <button onClick={() => mutate(id)}>
            {hearts ? (
              <HeartIcon
                className={`w-6 h-6  inline-block mr-1 ${
                  currentUserLiked
                    ? "text-red-400 fill-current animate-pulse"
                    : "text-black-400 animate-pulse"
                }`}
              />
            ) : null}
            <span>{hearts && hearts.length}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
