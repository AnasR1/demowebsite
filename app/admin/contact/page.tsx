"use client";

import React, { useEffect, useState } from "react";

interface Submission {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

export default function AdminContactPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadSubmissions() {
        setLoading(true);
        const res = await fetch("https://api.anasabdurrahman.com/admin/contact", { cache: "no-store" });
        const data = await res.json();
        setSubmissions(data);
        setLoading(false);
    }

    async function deleteSubmission(id: string) {
        const confirmed = confirm("Delete this submission? This cannot be undone.");
        if (!confirmed) return;
        await fetch(`https://api.anasabdurrahman.com/admin/contact/${id}`, {
            method: "DELETE",
        });
        await loadSubmissions();
    }
    
    useEffect(() => {
        loadSubmissions();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <div>
      <h1>Admin: Contact Submissions</h1>

      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s._id}>
                <td>{new Date(s.createdAt).toLocaleString()}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.message}</td>
                <td>
                  <button onClick={() => deleteSubmission(s._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}