"use client"

import styles from '@/styles/signup.module.css'

export default function Signup() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupData = {
      firstName : e.target.firstName.value,
      lastName : e.target.lastName.value,
      email : e.target.email.value,
      username : e.target.username.value,
      password : e.target.password.value,
      age : e.target.age.value
    };

    try
    {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();

      if ( res.status === 200 )
      {
        console.log("Signup successful");
        console.log(data);
      }
    } catch (error) 
    {
      console.error("Error:", error);
    }
  }

  return (
    <main className={styles.main}>
      <h1>Signup</h1>
      <div>
        <form onSubmit={handleSubmit} method="post">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
          />
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
          <input
            type="number"
            placeholder="Age"
            name="age"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  )
}