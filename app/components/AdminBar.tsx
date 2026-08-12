import LogoutButton from "./LogoutButton";
import styles from "./AdminBar.module.css";

export default function AdminBar({ username }: { username: string }) {
  return (
    <div className={styles.bar}>
      <div className={styles.links}>
        <span>Logged in as {username}</span>
        <a href="/admin/listings">Listings</a>
        <a href="/admin/contact">Contact</a>
        <a href="/admin/users">Users</a>
      </div>
      <LogoutButton />
    </div>
  );
}