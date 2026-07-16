import styles from "./ListingCard.module.css";

interface ListingCardProps {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

export default function ListingCard({ id, title, description, price, imageUrl }: ListingCardProps) {
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