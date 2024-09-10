import Image from "next/image";
import main from "../../public/main.png";
import book from "../../public/book.png";
import { format } from "date-fns/format";
import NewsComponent from "@/components/newsComponent/NewsComponent";
import React from "react";
export default function Home() {
  return (
    <>
      <main className="flex md:flex-row flex-col justify-center items-center gap-6 md:gap-3 bg-slate-50 px-20 p-4 md:h-[200px]">
        <div className="text-black text-sm capitalize">
          {format(new Date(), "dd MMMM yyyy")}
          <br />
          today&apos;s top headlines
        </div>
        <div className="mx-auto">
          <Image src={main} width={539} height={108} alt="logo" />
        </div>
        <div>
          <Image src={book} width={150} height={108} alt="logo" />
        </div>
      </main>
      <React.Suspense fallback={<div>Loading...</div>}>
        <NewsComponent />
      </React.Suspense>
    </>
  );
}
