import React from "react";

export default function ErrorPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-[#222831] text-[#EEEEEE]">
      <h1 className="text-4xl font-bold text-[#FFD369]">Page not found!</h1>
      <h3 className="text-xl text-[#EEEEEE]/80">
        Please check the address and try again
      </h3>
      <a
        href="/"
        className="mt-4 rounded-md bg-[#FFD369] px-4 py-2 text-[#222831] hover:bg-[#FFD369]/90"
      >
        Return to Home
      </a>
    </div>
  );
}
