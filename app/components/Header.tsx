import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import logo from ".././templogo.webp";

export default function Header() {
    return <header className={styles.header}>
        <nav className={styles.nav}>
            <ul>
                <a href="/">
                    <Image src={logo} alt="Temp Logo" width={50} height={50} />
                </a>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/listings">Listings</Link>
                </li>
                <li>
                    <Link href="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    </header>;
}