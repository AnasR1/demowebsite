import styles from "./ListingCard.module.css";

interface ListingCardProps {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

export default function ListingCard({ title, description, price, imageUrl }: ListingCardProps) {
  return (
    <div className={styles.listingCard}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.info}>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>Price: ${price}</p>
      </div>
    </div>  
  );
}