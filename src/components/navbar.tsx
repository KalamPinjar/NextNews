"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { ModeToggle } from "./theme-provider/theme-toggle";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useNewsStore } from "@/store/newsStore";
import Link from "next/link";

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

const languages: { code: string; name: string }[] = [
  { name: "Arabic", code: "ar" },
  { name: "English", code: "en" },
  { name: "French", code: "fr" },
  { name: "Hindi", code: "hi" },
  { name: "Japanese", code: "ja" },
  { name: "Russian", code: "ru" },
  { name: "Spanish", code: "es" },
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
  const [searchQuery, setSearchQuery] = React.useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCategory = searchParams.get("category") || "general";
  const currentCountry = searchParams.get("country") || "us";
  const currentLang = searchParams.get("lang") || "en";

  const { fetchNews } = useNewsStore((state) => ({
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    router.push(`/search?query=${searchQuery}&page=1`);
  };

  React.useEffect(() => {
    fetchNews({
      country: currentCountry,
      category: currentCategory,
      lang: currentLang,
    });
  }, [currentCategory, currentCountry, currentLang, fetchNews]);

  return (
    <React.Suspense fallback={<Loader2 className="w-8 h-8 animate-spin" />}>
      <NavigationMenu className="top-0 sticky border-white bg-gray-950 p-2 border-b-2 border-double">
        <NavigationMenuList className="gap-3">
          <Menubar className="md:flex gap-3 hidden">
            <MenubarMenu>
              <MenubarTrigger>Categories</MenubarTrigger>
              <MenubarContent>
                <ul className="gap-3 grid grid-cols-1 p-4">
                  {listOfCategories.map((category) => (
                    <MenubarItem
                      className="capitalize"
                      key={category.name}
                      onClick={() => handleCategoryChange(category.name)}
                    >
                      {category.name}
                      <MenubarSeparator />
                    </MenubarItem>
                  ))}
                </ul>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Countries</MenubarTrigger>
              <MenubarContent>
                <ul className="gap-3 grid md:grid-cols-2 lg:grid-cols-3 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
                  {countries.map((country) => (
                    <MenubarItem
                      key={country.code}
                      onClick={() => handleCountryChange(country.code)}
                    >
                      {country.name}
                    </MenubarItem>
                  ))}
                </ul>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Languages</MenubarTrigger>
              <MenubarContent>
                <ul className="gap-3 grid grid-cols-1 p-4 capitalize">
                  {languages.map((lang) => (
                    <MenubarItem
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      {lang.name}
                    </MenubarItem>
                  ))}
                </ul>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <NavigationMenuItem>
            <Link href="/">
              <div className="font-bold text-center">𝔸ℂ𝕆ℕ𝔼𝕎𝕊</div>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <form onSubmit={handleSearch}>
                <Input
                  className="bg-inherit border-none focus:ring-0 focus-visible:ring-0"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                >
                  <Search className="opacity-50 mr-2 w-4 h-4" />
                </Input>
              </form>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </React.Suspense>
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
