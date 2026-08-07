"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    _id: number;
    username: string;
    createdAt: string;
}

export default function AdminUsersPage() {
    const router = useRouter();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [addError, setAddError] = useState("");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editUsername, setEditUsername] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [editError, setEditError] = useState("");
    
    async function loadUsers() {
        setLoading(true);
        const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {cache: "no-store", credentials: "include"});
        
        if (res.status === 401) {
            router.push("/login");
            return;
        }

        const data = await res.json();
        setUsers(data);
        setLoading(false);
    }

    async function addUser(e: React.SubmitEvent<HTMLFormElement>) {
      e.preventDefault();
      setAddError("");

      if (!username || !password) {
          setAddError("Please fill in all fields");
          return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ username, password })
      });
      
      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (res.status === 409) {
        setAddError("Username already exists");
        return;
      }

      setUsername("");
      setPassword("");
      await loadUsers();
    }

    function startEditing(user: User) {
      setEditingId(user._id.toString());
      setEditUsername(user.username);
      setEditPassword("");
      setEditError("");
    }

    async function saveEdit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!editingId) return;
        setEditError("");

        const body: { username?: string; password?: string } = {};
        if (editUsername) body.username = editUsername;
        if (editPassword) body.password = editPassword;

        if (Object.keys(body).length === 0) {
            setEditError("Please fill in at least one field");
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify( body )
        });

        if (res.status === 401) {
            router.push("/login");
            return;
        }
        
        if (!res.ok) {
            setEditError("Failed to update user");
            return;
        }
        setEditingId(null);
        await loadUsers();
    }

    async function deleteUser(id: number) {
        const confirmDelete = confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        if (res.status === 401) {
            router.push("/login");
            return;
        }

        if (res.status === 403) {
            alert("Cannot delete last user");
            return;
        }

        await loadUsers();
    }

    useEffect(() => {
        loadUsers();
    }   , []);

    if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin: Users</h1>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => startEditing(user)}>Edit</button>{" "}
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New User</h2>
      <form onSubmit={addUser}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
      {addError && <p style={{ color: "red" }}>{addError}</p>}

      {editingId && (
        <>
          <h2>Edit User</h2>
          <form onSubmit={saveEdit}>
            <input
              placeholder="Username"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="New password (leave blank to keep current)"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => { setEditingId(null); setEditError(""); }}>Cancel</button>
          </form>
          {editError && <p style={{ color: "red" }}>{editError}</p>}
        </>
      )}
    </div>
  );
}
