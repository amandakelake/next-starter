import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/index.module.scss';
import CustomVideo from '@/components/video';

export default function Home() {
	const [showBrand, setShowBrand] = useState(false);
	const [showVideo, setShowVideo] = useState(false);

	const [videoCoding, setVideoCoding] = useState(264);
	const [videoFrameRate, setVideoFrameRate] = useState(48);

	const handleStart = () => {
		console.log('handleStart');
		setShowBrand(true);
		setTimeout(() => {
			setShowBrand(false);
			setShowVideo(true);
		}, 500);
	};


	const normalizedVideoUrl = () => {
		return `/video/${videoCoding}/capsule-H${videoCoding}-1080-1920-${videoFrameRate}fps.mp4`;
	}

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
						<p className={styles.selectTitle}>选择对应的视频码率和帧率</p>
						<div className={styles.selectLine}>
							<button className={`${styles.btn} ${videoCoding === 264 && styles.selected}`} onClick={() => setVideoCoding(264)}>H264</button>
							<button className={`${styles.btn} ${videoCoding === 265 && styles.selected}`} onClick={() => setVideoCoding(265)}>H265</button>
						</div>
						<div className={styles.selectLine}>
							<button className={`${styles.btn} ${videoFrameRate === 30 && styles.selected}`} onClick={() => setVideoFrameRate(30)}>30fps</button>
							<button className={`${styles.btn} ${videoFrameRate === 48 && styles.selected}`} onClick={() => setVideoFrameRate(48)}>48fps</button>
							<button className={`${styles.btn} ${videoFrameRate === 60 && styles.selected}`} onClick={() => setVideoFrameRate(60)}>60fps</button>
						</div>
						<div className={styles.btnLine}>
							<button className={styles.btn} onClick={handleStart}>播放视频</button>
						</div>
					</div>
				}

				{showBrand ? <div className={styles.brandLayout}>
					品牌页快速闪烁
				</div> : null}

				{showVideo ? <div className={styles.videoLayout}>
					<CustomVideo url={normalizedVideoUrl()} width={'auto'} height={'100vh'} style={{opacity: 0.9}}/>
				</div> : null}

			</main>
		</>
	);
}
