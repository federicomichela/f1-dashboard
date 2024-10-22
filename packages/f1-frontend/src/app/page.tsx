import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="page-container">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Image
          className="dark:invert"
          src="/images/f1_logo.png"
          alt="Formula 1 logo"
          width={180}
          height={38}
          priority
        />

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/dashboard"
            rel="noopener noreferrer"
          >
            Dashboard
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
