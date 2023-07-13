"use client"

import styles from '@/styles/login.module.css'
import { useState } from 'react'

export default function Login() {
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username : e.target.username.value,
      password : e.target.password.value,
    };

    try
    {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if ( res.status === 200 )
      {
        console.log("Login successful");
        console.log(data);
      }
      setSubmitMessage(JSON.stringify(data));
    } catch (error) 
    {
      console.error("Error:", error);
    }
  }

  return (
    <main className={styles.main}>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit} method="post">
          <input
            type="text"
            placeholder="Username"
            name="username"
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      { submitMessage && <div>{submitMessage}</div> }
    </main>
  )
}