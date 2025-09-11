"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface FeedItem {
  id: string;
  text: string;
  imageUrl?: string;
  createdAt: string; // ISO date string
}

interface FeedProps {
  items: FeedItem[];
  profileImage: string; // your avatar URL
  authorName: string;
}

const Feed: React.FC<FeedProps> = ({ items, profileImage, authorName }) => {
  // which image is expanded and its computed height in px
  const [expanded, setExpanded] = useState<{ id: string | null; height: number | null }>({
    id: null,
    height: null,
  });

  // store refs to each image container to measure width
  const containerRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // toggle expand/collapse for an item
  const handleToggle = async (item: FeedItem) => {
    // collapse if clicking the same one
    if (expanded.id === item.id) {
      setExpanded({ id: null, height: null });
      return;
    }

    // ensure we have an image URL
    if (!item.imageUrl) return;

    const container = containerRefs.current.get(item.id);
    const containerWidth = container?.clientWidth ?? Math.min(window.innerWidth, 720);

    // preload to get natural dimensions
    const img = new window.Image();
    img.src = item.imageUrl;

    await new Promise<void>((resolve) => {
      if (img.complete && img.naturalWidth) return resolve();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // still resolve on error, fallback dims used
    });

    const naturalW = img.naturalWidth || containerWidth;
    const naturalH = img.naturalHeight || Math.round(containerWidth * 0.6);

    // calculate scaled height to maintain aspect ratio for the current container width
    let scaledHeight = Math.round((naturalH * containerWidth) / naturalW);

    // cap height to 80% of viewport to avoid huge expansions
    const maxAllowed = Math.round(window.innerHeight * 0.8);
    if (scaledHeight > maxAllowed) scaledHeight = maxAllowed;

    setExpanded({ id: item.id, height: scaledHeight });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start space-x-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-5 transition hover:shadow-lg"
        >
          <Image
            src="/images/mohsen.png"
            alt="Moss FM"
            className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-700"
            width={48}
            height={48}
          />

          {/* Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900 dark:text-white">{authorName}</span>
              <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</span>
            </div>

            <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">{item.text}</p>

            {/* Image: collapsed = fixed height (cropped), expanded = computed height showing full scaled image */}
            {item.imageUrl && (
              <div className="mt-3">
                <div
                  // container needs to be relative for next/image fill
                  ref={(el) => {
                    if (el) containerRefs.current.set(item.id, el);
                    else containerRefs.current.delete(item.id);
                  }}
                  onClick={() => handleToggle(item)}
                  className={`relative w-full max-w-xl rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer transition-all duration-300 ${
                    expanded.id === item.id ? "" : "h-64"
                  }`}
                  // when expanded, set computed height inline so next/image fill fits that height
                  style={expanded.id === item.id && expanded.height ? { height: `${expanded.height}px`, maxHeight: "80vh" } : undefined}
                >
                  <Image
                    src={item.imageUrl}
                    alt="post"
                    fill
                    className={`rounded-xl ${expanded.id === item.id ? "object-contain" : "object-cover"}`}
                  />
                </div>

                <p className="mt-1 text-xs text-gray-500 text-center">
                  {expanded.id === item.id ? "Click to collapse" : "Click to expand"}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;