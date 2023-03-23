import Head from 'next/head'
import styles from '@/styles/index.module.css'


export default function Home() {
  return (
    <>
      <Head>
        <title>Test</title>
        <meta name="description" content="test video/3D/performance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
            <div>video</div>
      </main>
    </>
  )
}
