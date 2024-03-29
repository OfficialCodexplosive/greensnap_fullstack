import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'


import Navbar from '@/components/navbar'

function Home() {
  return (
    <>
      <Navbar/>
      <main className={styles.main}>
        <h1>Startseite</h1>
        <Link href="/signup">Registrieren</Link>
        <Link href="/login">Anmelden</Link>
        <Link href="/report">Müll melden</Link>
      </main>
    </>
  )
}
 
export default Home