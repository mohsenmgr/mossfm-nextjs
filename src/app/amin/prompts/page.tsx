"use client";

import { useSession } from "next-auth/react";

import { PromptCardList, type Post } from "@/components/PromptCardList";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PromptPage() {

    const { data: session, status } = useSession();
    const [posts,setPosts] = useState<Post[]>([]);
    const router = useRouter(); // <-- call the hook inside component


      useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/amin");
    }
  }, [status, router]);


    const handleDelete = async (postId: string) => {

            console.log("delete clicked");
    }

   useEffect(()=> {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    }

    fetchPosts();
  }, [status]);
    

  if (status === "loading") return <p>Loading...</p>;


  return (
    
            <main className="flex-1 max-w-6xl mx-auto p-6 min-h-screen">
                  <button
                onClick={() => router.push("/amin")}
                className="mb-6 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition"
            >
                ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white mb-4">Manage Prompts</h1>

          

            <div className="bg-gray-900 dark:bg-gray-800 p-6 rounded-2xl shadow-lg min-h-[80vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <PromptCardList posts={posts} currentUserId={session?.user.id} onDelete={handleDelete} />
                </div>
            </div>
            </main>
  );


}