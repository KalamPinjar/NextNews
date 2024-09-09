"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./theme-provider/theme-toggle";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useNewsStore } from "@/store/newsStore";

const listOfCategories: { name: string }[] = [
  { name: "technology" },
  { name: "business" },
  { name: "entertainment" },
  { name: "sports" },
  { name: "health" },
  { name: "science" },
  { name: "general" },
  { name: "nation" },
  { name: "world" },
];

const languages: { name: string }[] = [
  { name: "ar" },
  { name: "zh" },
  { name: "nl" },
  { name: "en" },
  { name: "fr" },
  { name: "de" },
  { name: "el" },
  { name: "he" },
  { name: "hi" },
  { name: "it" },
  { name: "ja" },
  { name: "ml" },
  { name: "mr" },
  { name: "no" },
  { name: "pt" },
  { name: "ro" },
  { name: "ru" },
  { name: "es" },
  { name: "sv" },
  { name: "ta" },
  { name: "te" },
  { name: "uk" },
];

const countries: { name: string; code: string }[] = [
  { name: "Australia", code: "au" },
  { name: "Brazil", code: "br" },
  { name: "Canada", code: "ca" },
  { name: "China", code: "cn" },
  { name: "Egypt", code: "eg" },
  { name: "France", code: "fr" },
  { name: "Germany", code: "de" },
  { name: "Greece", code: "gr" },
  { name: "Hong Kong", code: "hk" },
  { name: "India", code: "in" },
  { name: "Ireland", code: "ie" },
  { name: "Israel", code: "il" },
  { name: "Italy", code: "it" },
  { name: "Japan", code: "jp" },
  { name: "Netherlands", code: "nl" },
  { name: "Norway", code: "no" },
  { name: "Pakistan", code: "pk" },
  { name: "Peru", code: "pe" },
  { name: "Philippines", code: "ph" },
  { name: "Portugal", code: "pt" },
  { name: "Romania", code: "ro" },
  { name: "Russian Federation", code: "ru" },
  { name: "Singapore", code: "sg" },
  { name: "Spain", code: "es" },
  { name: "Sweden", code: "se" },
  { name: "Switzerland", code: "ch" },
  { name: "Taiwan", code: "tw" },
  { name: "Ukraine", code: "ua" },
  { name: "United Kingdom", code: "gb" },
  { name: "United States", code: "us" },
];

export function Navbar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCategory = searchParams.get("category") || "general";
  const currentCountry = searchParams.get("country") || "us";
  const currentLang = searchParams.get("lang") || "en";

  const { newsData, loading, error, fetchNews } = useNewsStore((state) => ({
    newsData: state.newsData,
    loading: state.loading,
    error: state.error,
    fetchNews: state.fetchNews,
  }));

  const handleCategoryChange = (category: string) => {
    router.push(
      `/?category=${category}&country=${currentCountry}&lang=${currentLang}`
    );
    fetchNews({ country: currentCountry, category, lang: currentLang });
  };

  const handleCountryChange = (country: string) => {
    router.push(
      `/?category=${currentCategory}&country=${country}&lang=${currentLang}`
    );
    fetchNews({ country, category: currentCategory, lang: currentLang });
  };

  const handleLanguageChange = (lang: string) => {
    router.push(
      `/?category=${currentCategory}&country=${currentCountry}&lang=${lang}`
    );
    fetchNews({ country: currentCountry, category: currentCategory, lang });
  };

  React.useEffect(() => {
    fetchNews({
      country: currentCountry,
      category: currentCategory,
      lang: currentLang,
    });
  }, [currentCategory, currentCountry, currentLang, fetchNews]);

  return (
    <NavigationMenu className="p-2">
      <NavigationMenuList className="gap-3">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-3 grid md:grid-cols-2 lg:grid-cols-3 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
              {listOfCategories.map((category) => (
                <ListItem
                  key={category.name}
                  title={category.name}
                  onClick={() => handleCategoryChange(category.name)}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Countries</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-3 grid md:grid-cols-2 lg:grid-cols-3 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
              {countries.map((country) => (
                <ListItem
                  key={country.code}
                  title={country.name}
                  onClick={() => handleCountryChange(country.code)}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Languages</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-3 grid md:grid-cols-2 lg:grid-cols-3 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
              {languages.map((lang) => (
                <ListItem
                  key={lang.name}
                  title={lang.name.toUpperCase()}
                  onClick={() => handleLanguageChange(lang.name)}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <div className="font-bold text-center">𝔸ℂ𝕆ℕ𝔼𝕎𝕊</div>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Input
              className="bg-inherit border-none focus:ring-0 focus-visible:ring-0"
              placeholder="Search news..."
            >
              <Search className="opacity-50 mr-2 w-4 h-4" />
            </Input>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
      {loading && <Loader2 className="w-6 h-6 animate-spin" />}
      {error && <div className="text-red-500">{error}</div>}
      {newsData && <div>{/* Render the fetched news data here */}</div>}
    </NavigationMenu>
  );
}

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  title: string;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, title, onClick, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        "text-sm leading-none rounded-sm flex items-center hover:bg-muted p-3 select-none outline-none cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {title}
    </li>
  )
);

ListItem.displayName = "ListItem";
