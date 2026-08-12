import LogoutButton from "../components/LogoutButton";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <nav>
          <a href="/admin/listings" style={{ marginRight: "1rem" }}>Listings</a>
          <a href="/admin/contact">Contact Submissions</a>
          <a href="/admin/users" style={{ marginLeft: "1rem" }}>Users</a>
        </nav>
        <LogoutButton />
      </header>
      <main style={{ padding: "1rem" }}>{children}</main>
    </div>
  );
}