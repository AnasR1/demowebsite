import type { Metadata } from "next";
import {cookies} from "next/headers";
import Header from "./components/Header";
import AdminBar from "./components/AdminBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "My App",
  description: "My application",
};

async function getLoggedInUser() {
  const cookieStore = cookies();
  const sessionId = (await cookieStore).get("sessionId");

  if (!sessionId) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { cookie: `sessionId=${sessionId.value}` },
      cache: "no-store",
    });

    if (!response.ok) {
      return null
    };

    return await response.json();
  }
  catch {
      return null
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getLoggedInUser();

  return (
    <html lang="en">
      <body>
        {user && AdminBar && <AdminBar user={user} />}
        <Header />
        {children}
      </body>
    </html>
  );
}
