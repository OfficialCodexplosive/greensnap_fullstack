"use client"

import styles from '@/styles/report.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'


export default function Manage()
{
    const [itemData, setItemData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        fetch('/api/get-items', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})
            .then((res) => res.json())
            .then((data) => {
                setItemData(JSON.stringify(data));
                setLoading(false)
            })
    },[]);


    return (
        <main className={styles.main}>
            { !isLoading && <div>{itemData}</div> }
        </main>
    )
}