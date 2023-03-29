"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Text } from "@nextui-org/react";
interface UserName {
  name: String;
}

export default function CreatePost({ name }: UserName) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const queryClient = useQueryClient();
  let toastPostID: string;

  function handleChange(e: string) {
    if (e.length >= 301) return;
    e.length ? setIsDisabled(false) : setIsDisabled(true);
    setTitle(e);
  }

  //Create a post
  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
      },
      onSuccess: (data) => {
        toast.success("Post has been made 🔥", { id: toastPostID });
        queryClient.invalidateQueries(["posts"]);
        setTitle("");
        setIsDisabled(true);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading("Creating your post", { id: toastPostID });
    setTimeout(() => {
      toast.dismiss(toastPostID);
    }, 1600);
    mutate(title);
    setIsDisabled(false);
  };

  return (
    <form
      onSubmit={submitPost}
      className={`${
        !name ? "cursor-not-allowed " : "cursor-default "
      }bg-white my-4 p-6 rounded-md border-solid border-2 border-gray-700`}
    >
      <div className="flex flex-col my-1">
        <Text
          h1
          size={30}
          css={{
            textGradient: "45deg, $blue700 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          {!name ? "Please Sign-in to Post!!" : `Welcome ${name}`}
        </Text>
        <textarea
          name="title"
          value={title}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          placeholder={`${
            !name
              ? "Oops looks like you can type in here 😜😲"
              : "Write down your thoughts here. 😀"
          }`}
          className={`${
            !name ? "cursor-not-allowed" : "cursor-text"
          } p-4 text-lg rounded-md my-2 bg-gray-200 border-solid border-2 border-gray-400`}
          disabled={!name}
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length >= 300 ? "text-red-700" : "text-gray-700"
          }`}
        >
          {`${title.length}/300 ${
            title.length >= 300 ? " Character limit reached!!" : ""
          }`}
        </p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Create a Post.
        </button>
      </div>
    </form>
  );
}
