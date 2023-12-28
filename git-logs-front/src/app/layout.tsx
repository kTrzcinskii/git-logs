import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { AppWrapper } from "~/components/AppWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Git Logs",
  description: "Browse your logs in your repository",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
