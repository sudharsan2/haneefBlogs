import React, { useState } from 'react';
import axios from 'axios';

const UnsubscribeForm = () => {
  const [email, setEmail] = useState('sudharsanselvam2@gmail.com');
  const [inputEmail, setInputEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleUnsubscribe = async () => {
    try {
        const response = await axios.post('http://172.235.21.99:9591/blog/unsubscribe', { email: inputEmail });
        if (response.status === 200) {
          setMessage('You have successfully unsubscribed.');
        } else {
          setMessage('You are already unsubscribed.');
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.');
      }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* <p style={styles.email}>{email} is subscribed to our mailing list(s).</p> */}
        {message === '' ? (
          <>
            <h1 style={styles.heading}>Unsubscribe from our mailing list</h1>
            <p style={styles.subHeading}>
              Please enter your email ID to unsubscribe:
            </p>
            <input
              type="email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              placeholder="Enter your email ID"
              style={styles.select}
            />
            <button onClick={handleUnsubscribe} style={styles.button}>Unsubscribe</button>
          </>
        ) : (
          <p style={styles.message}>{message}</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f3ecec',
  },
  card: {
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width:"25vw"
  },
  email: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '24px',
    color: '#ff5722',
    marginBottom: '10px',
  },
  subHeading: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  select: {
    width: '75%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2196f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default UnsubscribeForm;
