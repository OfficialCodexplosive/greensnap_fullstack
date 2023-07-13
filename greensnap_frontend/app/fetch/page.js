import styles from '@/styles/fetch.module.css'

async function getData()
{
  const res = await fetch(`${process.env.BACKEND_URL}/user/exposed`)
  const data = await res.json();

  console.log( JSON.stringify(data) );
  return JSON.stringify(data);
}

export default async function Fetch() {
  const data = await getData();
  return (
    <main className={styles.main}>
      <h1>Data Fetch</h1>
      <div>
        { data }
      </div>
    </main>
  )
}