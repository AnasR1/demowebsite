"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({}),
    });
    router.push("/login");
  }

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <nav>
          <a href="/admin/listings" style={{ marginRight: "1rem" }}>Listings</a>
          <a href="/admin/contact">Contact Submissions</a>
        </nav>
        <button onClick={handleLogout}>Log out</button>
      </header>
      <main style={{ padding: "1rem" }}>{children}</main>
    </div>
  );
}