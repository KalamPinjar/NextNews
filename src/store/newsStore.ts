// src/store/newsStore.ts
import { create } from "zustand";

interface NewsState {
  newsData?: {
    articles: Array<{
      title: string;
      description: string;
      content: string;
      url: string;
      image: string;
      publishedAt: string;
      source: {
        name: string;
        url: string;
      }
      // Add other properties that might be present in each article
    }>;
  };
  loading: boolean;
  error: string | null;
  setNewsData: (data: never) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchNews: (params: {
    country: string;
    category: string;
    lang: string;
  }) => Promise<void>;
}

export const useNewsStore = create<NewsState>((set) => ({
  newsData: { articles: [] },
  loading: false,
  error: null,
  setNewsData: (data) => set({ newsData: data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  fetchNews: async ({ country, category, lang }) => {
    set({ loading: true, error: null });
    const cacheKey = `news_${country}_${category}_${lang}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      set({ newsData: JSON.parse(cachedData), loading: false });
    } else {
      try {
        const response = await fetch(
          `/api/top-headlines?country=${country}&category=${category}&lang=${lang}`
        );
        const data = await response.json();
        set({ newsData: data });
        localStorage.setItem(cacheKey, JSON.stringify(data));
      } catch (error) {
        set({ error: "Failed to fetch news" });
      } finally {
        set({ loading: false });
      }
    }
  },
}));
