import ListingCard from "../components/ListingCard";
import "./listings.css";

async function fetchListings() {
  const response = await fetch(`${process.env.BACKEND_INTERNAL_URL}/listings`, {cache: "no-store"});
  if (!response.ok) {
    throw new Error("Failed to fetch listings");
  }
  return response.json();
}

export default async function listings() {
  const listings = await fetchListings();

  return <div className="listings-page">
    <h1>Listings Page</h1>
    <p>Welcome to the listings page where we sell houses for real!</p>
       {listings.map((listing: { _id: string; name: string; description: string; price: number; image?: string }) => (
        <>
          <br />
          <ListingCard
            key={listing._id}
            id={listing._id}
            title={listing.name}
            price={listing.price}
            description={listing.description}
            imageUrl={listing.image ? `${process.env.NEXT_PUBLIC_API_URL}${listing.image}` : "/templogo.webp"}
          />
        </>
      ))}
  </div>;
}
