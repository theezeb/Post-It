"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type ShowPosts = {
  id: string;
  avatar: string;
  postTitle: string;
  name: string;
  title: string;
  date: string;
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
  comments,
}: ShowPosts) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
      key={comments.userId}
    >
      <div className="bg-white my-5 p-7 rounded-lg">
        <div className="flex items-center gap-2 space-x-80">
          <div className="relative top-4">
            <Image
              className="rounded-full"
              width={32}
              height={32}
              src={avatar}
              alt="avatar"
            />
            <div className="relative bottom-7 left-10 font-bold  text-gray-700">
              {name}
            </div>
          </div>

          <div className="bg-gray-100 rounded-md p-1">
            {date?.substring(0, 10)}
          </div>
        </div>
        <div className="my-8">
          <p className="break-all">{postTitle}</p>
        </div>
        <div className="flex gap-4 cursor-pointer items-center">
          <Link href={`/post/${id}`}>
            <p className="text-sm font-bold text-gray-700">
              {comments?.length} Comments
            </p>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
