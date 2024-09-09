// src/store/newsStore.ts
import { create } from "zustand";

interface NewsState {
  newsData: string | null;
  loading: boolean;
  error: string | null;
  setNewsData: (data: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchNews: (params: {
    country: string;
    category: string;
    lang: string;
  }) => Promise<void>;
}

export const useNewsStore = create<NewsState>((set) => ({
  newsData: null,
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
