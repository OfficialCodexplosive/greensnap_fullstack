import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

function Home() {
  return (
    <main className={styles.main}>
      <h1>Startseite</h1>
      <Link href="/fetch">Müll melden</Link>
    </main>
  )
}
 
export default Home