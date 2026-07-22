"use client";
import { useState } from 'react';
import styles from './contactpage.module.css';

export default function contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('https://api.anasabdurrahman.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
    }
    catch (error) {
      setError('There was an error submitting the form. Please try again later.');
    }
  }

  return <div className={styles.ContactPage}>
    <div className={styles.ContactUs}>
      <h1>Contact Us</h1>
      <p>You can reach us at contact@example.com or submit this form.</p>
    </div>
    <div className={styles.contactInfo}>
      {submitted ? (
        <p>Thank you for your message! We will get back to you soon.</p>
      ) : (
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
        
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className={styles.buttonContainer}>   
          <button className={styles.button} type="submit">Submit</button>
        </div>
      </form>
      )}
    </div>
  </div>
}
