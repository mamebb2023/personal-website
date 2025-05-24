import type { Metadata } from "next";
import "./globals.css";
import ReactLenis from "lenis/react";

export const metadata: Metadata = {
  title: "Mohammednur | Software Engineer",
  description:
    "Portfolio of Mohammednur, a software engineer specializing in web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-cabin-variable antialiased overflow-x-hidden`}>
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  );
}
