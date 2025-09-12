"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Creator {
  _id: string;
  username: string;
  email: string;
  image: string;
}

export interface Post {
  _id : string;
  prompt: string;
  tag: string;
  creator: Creator;
}

interface PromptCardProps {
  post: Post;
  isOwner?: boolean; 
  onDelete?: (postId: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ post, isOwner, onDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-5 flex flex-col space-y-3 transition hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Image
            src={post.creator.image}
            alt={post.creator.username}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 dark:text-white">{post.creator.username}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{post.creator.email}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {copied ? "✅" : "📋"}
        </button>
      </div>

      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{post.prompt}</p>

      {isOwner && onDelete && (
        <button
          onClick={() => onDelete(post._id)}
          className="self-end px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition"
        >
          Delete
        </button>
      )}
    </div>
  );
};

interface PromptCardListProps {
  posts: Post[];
  currentUserId?: string;
  onDelete?: (postId: string) => void;
}

export const PromptCardList: React.FC<PromptCardListProps> = ({ posts, currentUserId, onDelete }) => {
  return (
        <>
          {posts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              isOwner={true}
              onDelete={onDelete}
            />
          ))}

        </>
       
  );
};