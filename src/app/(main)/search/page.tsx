"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { TypographyBlockquote } from "@/components/typography/blockquote";
import Link from "next/link";
import { Loader2 } from "lucide-react";

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

const SearchResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const query = searchParams.get("query");
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/search?query=${query}&page=${page}`
        );
        setResults(response.data.articles);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data || error.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, page]);

  const handleNextPage = () => {
    router.push(`/search?query=${query}&page=${Number(page) + 1}`);
  };

  const handlePrevPage = () => {
    router.push(`/search?query=${query}&page=${Number(page) - 1}`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white dark:bg-gray-950 mx-auto p-6 container">
      <h1 className="mb-10 font-bold text-black text-xl dark:text-white">
        Search Results for &quot;{query}&quot;
      </h1>

      <ul>
        {results?.map((article: Article, idx: number) => (
          <li key={idx} className="my-2 p-4 border">
            <Link
              className="font-bold text-black text-xl dark:text-white"
              href={`/${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                localStorage.setItem("selectedArticle", JSON.stringify(article))
              }
            >
              {article.title}
            </Link>
            <TypographyBlockquote>{article.description}</TypographyBlockquote>
          </li>
        ))}
      </ul>

      <div className="flex justify-between my-4">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default SearchResults;
