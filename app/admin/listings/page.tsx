"use client";

import React, { useEffect, useState } from "react";

interface Listing {
  _id: string;
  name: string;
  description: string;
  price: number;
}

export default function AdminListingsPage() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadListings() {
        setLoading(true);
        const res = await fetch("https://api.anasabdurrahman.com/listings", { cache: "no-store" });
        const data = await res.json();
        setListings(data);
        setLoading(false);
    }
    async function deleteListing(id: string) {
        const confirmed = confirm("Delete this listing? This cannot be undone.");
        if (!confirmed) return;
        await fetch(`https://api.anasabdurrahman.com/listings/${id}`, {
            method: "DELETE",
        });
        await loadListings();
    }

    async function addListing(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const price = parseFloat(newPrice);
    if (!newName || isNaN(price)) {
      alert("Name and a valid price are required");
      return;
    }

    await fetch("https://api.anasabdurrahman.com/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, description: newDescription, price }),
    });

    setNewName("");
    setNewDescription("");
    setNewPrice("");
    await loadListings();
  }
    function startEditing(listing: Listing) {
    setEditingId(listing._id);
    setEditName(listing.name);
    setEditDescription(listing.description);
    setEditPrice(String(listing.price));
  }

  async function saveEdit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingId) return;

    const price = parseFloat(editPrice);
    if (!editName || isNaN(price)) {
      alert("Name and a valid price are required");
      return;
    }

    await fetch(`https://api.anasabdurrahman.com/listings/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, description: editDescription, price }),
    });

    setEditingId(null);
    await loadListings();
  }

  useEffect(() => {
    loadListings();
  }, []);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin: Listings</h1>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing._id}>
              <td>{listing.name}</td>
              <td>{listing.description}</td>
              <td>${listing.price}</td>
              <td>
                <button onClick={() => startEditing(listing)}>Edit</button>{" "}
                <button onClick={() => deleteListing(listing._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add New Listing</h2>
      <form onSubmit={addListing}>
        <input
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <button type="submit">Add Listing</button>
      </form>
      {editingId && (
        <>
          <h2>Edit Listing</h2>
          <form onSubmit={saveEdit}>
            <input
              placeholder="Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <input
              placeholder="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
          </form>
        </>
      )}
    </div>
  );
}