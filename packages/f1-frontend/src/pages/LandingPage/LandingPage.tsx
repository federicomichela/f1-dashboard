import React from 'react';
import './LandingPage.scss';
import {Footer} from "../../components/Footer";

export function LandingPage() {
  return (
      <div className="page-container debug">
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <img
              className="dark:invert"
              src="logo192.png"
              alt="Formula 1 logo"
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
        <Footer/>
      </div>
  );
}

export default LandingPage;