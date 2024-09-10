// pages/api/top-headlines/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const country = url.searchParams.get("country");
  const category = url.searchParams.get("category");
  const lang = url.searchParams.get("lang");
  try {
    const res = await axios.get(
      `https://gnews.io/api/v4/top-headlines?country=${country}&category=${category}&max=9&language=${lang}&apikey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error (Top-Headlines)", {
      status: 500,
    });
  }
}
