"use client"

import styles from '@/styles/navbar.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import { usePathname } from "next/navigation";
import { useRouter } from 'next/router'

export default function Navbar()
{
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
        fetch('/api/get-user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})
            .then((res) => res.json())
            .then((data) => {
                if(data.message === "Unauthorized")
                {
                    setLoggedIn(false);
                    return;
                }
                setUserData(JSON.stringify(data));
                setLoggedIn(true)
            })
    },[]);

    //const router = useRouter();
    const pathname = usePathname();


    return (
        <div className={styles.navbar}>
            <ul>
                <li>
                    <Link className={`${pathname == "/" ? styles.active : ""}`} href="/">Home</Link>
                </li>
                <li><Link className={`${pathname == "/report" ? styles.active : ""}`} href="/report">Melden</Link></li>
                {/*<li><Link className={`${pathname == "/" ? styles.active : ""}`} href="/about">About</Link></li>*/}
                <li><Link className={`${pathname == "/contact" ? styles.active : ""}`} href="/contact">Kontakt</Link></li>
                <li>
                    { isLoggedIn ? ( 
                            <Link className={`${pathname == "/profile" ? styles.active : ""}`} href="/profile">Profil</Link> 
                            ) : ( 
                            <Link className={`${pathname == "/login" ? styles.active : ""}`} href="/login">Anmelden</Link> 
                        ) 
                    }
                    
                </li>
            </ul>
        </div>
    )
}