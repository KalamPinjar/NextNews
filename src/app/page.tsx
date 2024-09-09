import { Navbar } from "./components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-between items-center bg-slate-50 dark:bg-black/0 p-24 min-h-screen"></main>
    </>
  );
}
