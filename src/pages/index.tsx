import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/index.module.scss';
import CustomVideo from '@/components/video';

export default function Home() {
	const [showBrand, setShowBrand] = useState(false);
	const [showVideo, setShowVideo] = useState(false);

	const handleStart = () => {
		console.log('handleStart');
		setShowBrand(true);
		setTimeout(() => {
			setShowBrand(false);
			setShowVideo(true);
		}, 500);
	};

	return (
		<>
			<Head>
				<title>Test</title>
				<meta name="description" content="test video/3D/performance"/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<main className={styles.main}>
				{
					showBrand || showVideo ? null : <div className={styles.startLayout}>
						<div className={styles.breathe}>
							<Image src={'/images/eve.png'} className={styles.image} alt="eve" width={200} height={200}/>
						</div>
						<div className={styles.btnLine}>
							<button className={styles.btn} onClick={handleStart}>Open Box</button>
						</div>
					</div>
				}

				{showBrand ? <div className={styles.brandLayout}>
					品牌页快速闪烁
				</div> : null}

				{showVideo ? <div className={styles.videoLayout}>
					<CustomVideo width={'100vw'} height={'auto'} style={{opacity: 0.9}}/>
				</div> : null}

			</main>
		</>
	);
}
