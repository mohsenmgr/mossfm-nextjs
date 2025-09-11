import Feed from "@/components/Feed";

export default function Page() {
  const myFeed = [
    {
      id: "1",
      text: "A few months back in beautiful Amsterdam, Excited to share more soon!",
      createdAt: new Date().toISOString(),
      imageUrl: "/images/moss_amsterdam.png",
    },
    {
      id: "2",
      text: "Launching Mohsen FM website 🚀 Hello World! ⚡ ",
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
      <Feed
        items={myFeed}
        profileImage="/images/me.jpg"
        authorName="Mohsen FM"
      />
    </div>
  );
}