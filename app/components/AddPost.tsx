"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  function handleChange(e: string) {
    if (e.length >= 301) return;
    e.length ? setIsDisabled(false) : setIsDisabled(true);
    setTitle(e);
  }

  //Create a post
  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title })
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          name="title"
          value={title}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          placeholder="Write down your thoughts here. 😀"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
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
