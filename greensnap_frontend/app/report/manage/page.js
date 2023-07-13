"use client"

import styles from '@/styles/report.module.css'
import Link from 'next/link'



export default function Manage()
{
    const handleSubmit = async (e) => {
        try
        {
            const res = await fetch('/api/get-items', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await res.json();
            console.log(data)
        }catch(error)
        {
            console.error("Error:", error);
        }
    }


    return (
        <main className={styles.main}>
            <button onClick={handleSubmit}>Get Items</button>
        </main>
    )
}