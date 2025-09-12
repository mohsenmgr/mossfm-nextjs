"use client";

import { signOut } from "next-auth/react";
import {
  FaUser,
  FaBriefcase,
  FaQuoteLeft,
  FaRss,
  FaFileUpload,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";
import { FaNoteSticky } from "react-icons/fa6";

export default function DashboardClient({ session }: { session: any }) {
  const cards = [
    { title: "About Me", icon: <FaUser />, href: "/amin/about" },
    { title: "Jobs", icon: <FaBriefcase />, href: "/amin/jobs" },
    { title: "Quotes", icon: <FaQuoteLeft />, href: "/amin/quotes" },
    { title: "Feed", icon: <FaRss />, href: "/amin/feed" },
    { title: "Upload CV", icon: <FaFileUpload />, href: "/amin/cv" },
    { title: "Messages", icon: <FaEnvelope />, href: "/amin/messages" },
    { title: "Prompts", icon: <FaNoteSticky />, href:"/amin/prompts" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">
            Welcome back, {session?.user?.name}
          </h1>
          <button
            onClick={() => signOut({ callbackUrl: "/amin" })}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-green-700 hover:bg-green-600 text-white transition"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group p-6 rounded-2xl shadow-lg bg-gradient-to-br from-green-800 to-green-900 border border-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300 flex flex-col items-center justify-center space-y-4 cursor-pointer"
            >
              <div className="text-4xl text-green-400 group-hover:text-green-300 transition">
                {card.icon}
              </div>
              <h2 className="text-xl font-semibold group-hover:text-green-200">
                {card.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}