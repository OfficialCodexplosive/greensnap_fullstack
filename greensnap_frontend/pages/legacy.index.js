import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

function Home({ data }) {
  console.log(data.data);
  return (
    <main className={styles.main}>
      <h1>Startseite</h1>
      <div>
        { data.data && data.data.map((user, index) => {
            console.log(index, user);
            return (
              <li key={index}>
                {user.username}
              </li>
            );
        })}
        </div>
      <Link href="/fetch">Müll melden</Link>
    </main>
  )
}
 
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.BACKEND_URL}/user/exposed`)
  const data = await res.json()
 
  // Pass data to the page via props
  return { props: { data } }
}
 
export default Home