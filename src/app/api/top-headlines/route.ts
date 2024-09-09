import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const country = searchParams.get("country");
    const category = searchParams.get("category");
    const lang = searchParams.get("lang");

    console.log(country, category, lang);

    // Use the values in your axios request
    const res = await axios.get(
      `https://gnews.io/api/v4/top-headlines?country=${country}&category=${category}&pageSize=10&language=${lang}&apikey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );

    console.log(res.data);
    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error (Top-Headlines)", {
      status: 500,
    });
  }
}
