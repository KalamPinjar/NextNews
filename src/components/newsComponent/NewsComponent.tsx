// NewsComponent.tsx
"use client";
import { useNewsStore } from "@/store/newsStore";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { format } from "date-fns";
import { SkeletonCard } from "./Skeleton";
import { Separator } from "../ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import Image from "./Image";
import { listOfCategories } from "@/lib/listofCategories";



const NewsComponent = () => {
  const { loading, error, newsData, fetchNews } = useNewsStore(
    (state) => state
  );
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCategory = searchParams.get("category") || "general";
  const currentCountry = searchParams.get("country") || "us";
  const currentLang = searchParams.get("lang") || "en";

  const handleCategoryChange = (category: string) => {
    router.push(
      `/?category=${category}&country=${currentCountry}&lang=${currentLang}`
    );
    fetchNews({ country: currentCountry, category, lang: currentLang });
  };

  React.useEffect(() => {
    fetchNews({
      country: currentCountry,
      category: currentCategory,
      lang: currentLang,
    });
  }, [currentCategory, currentCountry, currentLang, fetchNews]);

  return (
    <div className="flex md:flex-row flex-col gap-6 bg-white dark:bg-gray-950 p-4 w-full">
      {/* Main news content */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 w-full lg:w-3/4 h-fit">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : error ? (
          <div className="text-center text-red-600">
            Error: {error}, try reloading!
          </div>
        ) : (
          newsData?.articles.map((article, index) => (
            <Card key={index} className="flex flex-col h-[400px]">
              <CardHeader className="p-0 text-center">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={300}
                  height={150}
                />
              </CardHeader>
              <div className="flex-grow p-4">
                <CardTitle className="pt-4 capitalize">
                  {article.title}
                </CardTitle>
                <CardDescription className="flex-1 pt-2 capitalize">
                  {article.description.slice(0, 100) + "..."}
                </CardDescription>
              </div>
              <CardFooter className="mt-auto p-4">
                <div className="text-right flex flex-col items-end w-full text-sm">
                  <Link
                    href={`/${encodeURIComponent(article.title)}`}
                    className="text-blue-500 cursor-pointer"
                    onClick={() =>
                      localStorage.setItem(
                        "selectedArticle",
                        JSON.stringify(article)
                      )
                    }
                  >
                    Read more
                  </Link>
                  <p className="pt-1">
                    {format(
                      new Date(article.publishedAt),
                      "dd MMMM yyyy HH:mm"
                    )}
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Sidebar */}
      <div className="flex flex-col flex-1 p-4 rounded-lg w-full lg:w-1/4">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <ul className="space-y-3">
              {listOfCategories.map((item, index) => (
                <li
                  key={index}
                  className="dark:hover:bg-slate-800 hover:bg-slate-50 shadow-md p-3 rounded-md text-black dark:text-white cursor-pointer"
                >
                  {item.name === currentCategory ? (
                    <div
                      className="bg-slate-300 dark:bg-slate-800 p-3 rounded-md capitalize cursor-pointer"
                      onClick={() => handleCategoryChange(item.name)}
                    >
                      {item.name}
                    </div>
                  ) : (
                    <div
                      className="p-3 rounded-md capitalize cursor-pointer"
                      onClick={() => handleCategoryChange(item.name)}
                    >
                      {item.name}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex flex-col justify-center items-center gap-4 mt-10">
              <h3 className="font-bold text-black text-lg dark:text-white">
                Live News Updates
              </h3>
              <iframe
                width="300"
                height="300"
                src="https://www.youtube.com/embed/oJUvTVdTMyY?si=e0Eujn9cMjjtD542"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <Separator />
              <iframe
                width="300"
                height="300"
                src="https://www.youtube.com/embed/iyOq8DhaMYw?si=ZdQpdp-bGAJ9h6Ow"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <Separator />

              <iframe
                width="300"
                height="300"
                src="https://www.youtube.com/embed/gCNeDWCI0vo?si=aJwttLqi7-j7BVB1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsComponent;
