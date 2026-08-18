"use client";

import React, { useEffect, useRef, useState } from "react";
import {useRouter} from "next/navigation";

interface Listing {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export default function AdminListingsPage() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadListings() {
      setLoading(true);
      //const res = await fetch("https://api.anasabdurrahman.com/listings", { cache: "no-store", credentials: "include" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings`, { cache: "no-store", credentials: "include" });
      const data = await res.json();
      setListings(data);
      setLoading(false);
  }

  async function deleteListing(id: string) {
    const confirmed = confirm("Delete this listing? This cannot be undone.");
    if (!confirmed) return;
    //const res = await fetch(`https://api.anasabdurrahman.com/listings/${id}`, {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.status === 401) {
        alert("You are not authorized to delete this listing.");
        router.push("/login");
        return;
    }
    await loadListings();
  }

  async function addListing(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const price = parseFloat(newPrice);
    if (!newName || isNaN(price)) {
      alert("Name and a valid price are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", newName);
    formData.append("description", newDescription);
    formData.append("price", String(price));
    if (newImageInputRef.current?.files?.[0]) {
      formData.append("image", newImageInputRef.current.files[0]);
    }

    //const res = await fetch("https://api.anasabdurrahman.com/listings", {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (res.status === 401) {
      alert("You are not authorized to add a listing.");
      router.push("/login");
      return;
    }

    setNewName("");
    setNewDescription("");
    setNewPrice("");
    await loadListings();
    if (newImageInputRef.current) newImageInputRef.current.value = "";
    await loadListings();
  }

  function startEditing(listing: Listing) {
    setEditingId(listing._id);
    setEditName(listing.name);
    setEditDescription(listing.description);
    setEditPrice(String(listing.price));
    if (editImageInputRef.current) editImageInputRef.current.value = "";
  }

  async function saveEdit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingId) return;

    const price = parseFloat(editPrice);
    if (!editName || isNaN(price)) {
      alert("Name and a valid price are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", editName);
    formData.append("description", editDescription);
    formData.append("price", String(price));
    if (editImageInputRef.current?.files?.[0]) {
      formData.append("image", editImageInputRef.current.files[0]);
    }

    //const res = await fetch(`https://api.anasabdurrahman.com/listings/${editingId}`, {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/${editingId}`, {
    method: "PUT",
      credentials: "include",
      body: formData,
    });

    if (res.status === 401) {
      alert("You are not authorized to edit this listing.");
      router.push("/login");
      return;
    }

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
  const newImageInputRef = useRef<HTMLInputElement>(null);
  const editImageInputRef = useRef<HTMLInputElement>(null);

  const editingListing = listings.find((l) => l._id === editingId);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin: Listings</h1>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing._id}>
              <td>
                {listing.image && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${listing.image}`}
                    alt={listing.name}
                    style={{ width: 60, height: 60, objectFit: "cover" }}
                  />
                )}
              </td>
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
        <input type="file" accept="image/*" ref={newImageInputRef} />
        <button type="submit">Add Listing</button>
      </form>
      {editingId && (
        <>
          <h2>Edit Listing</h2>
          {editingListing && (
            <div>
              <p> Current Image: </p>
              <img 
                src={`${process.env.NEXT_PUBLIC_API_URL}${editingListing.image}`}
                alt={editingListing.name}
                style={{ width: 60, height: 60, objectFit: "cover" }}
              />
            </div>
          )}
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
            <input type="file" accept="image/*" ref={editImageInputRef} />
            <p style={{ fontSize: "0.85em", color: "#666" }}>
              Leave blank to keep the current image.
            </p>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
          </form>
        </>
      )}
    </div>
  );
}