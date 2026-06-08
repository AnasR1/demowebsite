import ListingCard from "../components/ListingCard";
import "./listings.css";

export default function listings() {
  return <div className="listings-page">
    <h1>Listings Page</h1>
    <p>Welcome to the listings page where we sell houses for real!</p>
    <br />
    <ListingCard id={1} title="Cozy Apartment" description="A cozy apartment in the city center." price={1200} imageUrl="/templogo.webp" />
    <br />
    <ListingCard id={2} title="Spacious House" description="A spacious house with a garden." price={2500} imageUrl="/templogo.webp" />
  </div>;
}
