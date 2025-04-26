import React from "react";
import "./index.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-[#222831]">{children}</main>
      </body>
    </html>
  );
}
