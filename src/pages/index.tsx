import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/index.module.scss';

export default function Home() {
    const [showBrand, setShowBrand] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    const handleStart = () => {
        console.log('handleStart')
    };

    return (
        <>
            <Head>
                <title>Test</title>
                <meta name="description" content="test video/3D/performance" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.startLayout}>
                    <div className={styles.breathe}>
                        <Image src={'/images/eve.png'} className={styles.image} alt="eve" width={200} height={200} />
                    </div>
                    <div className={styles.btnLine}>
                        <button className={styles.btn} onClick={handleStart}>Open Box</button>
                    </div>
                </div>
            </main>
        </>
    );
}
