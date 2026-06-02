import styles from './contactpage.module.css';

export default function contact() {
  return <div className={styles.ContactPage}>
    <div className={styles.ContactUs}>
      <h1>Contact Us</h1>
      <p>You can reach us at contact@example.com or submit this form.</p>
    </div>
    <div className={styles.contactInfo}>
      <form className={styles.form}>
        
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
        <div className={styles.buttonContainer}>   
        <button className={styles.button} type="submit">Submit</button>
        </div>
      </form>
    </div>;
  </div>
}
