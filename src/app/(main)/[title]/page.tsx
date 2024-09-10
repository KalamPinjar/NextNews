"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import Image from "@/components/newsComponent/Image";

interface Article {
  title: string;
  publishedAt: string;
  source: {
    name: string;
  };
  image: string;
  content: string;
  description: string;
  url: string;
}

// Single article page component
export default function ArticlePage({ params }: { params: { title: string } }) {

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    // Retrieve the selected article from localStorage
    const storedArticle = localStorage.getItem("selectedArticle");
    if (storedArticle) {
      const parsedArticle = JSON.parse(storedArticle);

      // Check if the article title matches the dynamic route parameter
      if (params.title === encodeURIComponent(parsedArticle.title)) {
        setArticle(parsedArticle);
      } else {
        notFound(); // If no match, trigger Next.js 404 page
      }
    } else {
      notFound();
    }
  }, [params.title]);

  if (!article) return null;

  return (
    <div className="bg-white dark:bg-gray-950 mx-auto px-64 py-6 container">
      {/* Article Header */}
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-3xl text-black dark:text-white">{article.title}</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-500">
            Published on:{" "}
            {format(new Date(article.publishedAt), "dd MMMM yyyy HH:mm")}
          </p>
          <p className="text-gray-500">Source: {article.source.name}</p>
        </div>
      </div>

      {/* Article Image */}
      <div className="relative mb-6 w-full h-[400px]">
        <Image style={{height:"400px"}} src={article.image} alt={article.title} />
      </div>

      {/* Article Content */}
      <div className="mb-6">
        <p className="mb-4 text-black/80 text-lg dark:text-white">{article.content}</p>
        <blockquote className="text-gray-600 italic">
          {article.description}
        </blockquote>
      </div>

      {/* Read more link */}
      <div className="mt-6">
        <Link
          className="text-blue-500 underline"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the full article on {article.source.name}
        </Link>
      </div>

      {/* Back to home */}
      <div className="mt-10">
        <Link
          href={"/"}
          className="bg-slate-800 px-4 py-2 rounded-lg text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
