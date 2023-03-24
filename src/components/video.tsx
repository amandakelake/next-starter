import { useMount } from '@/hooks/useMount';
import { useState } from 'react';
import { ReactPlayerProps } from 'react-player';
import ReactPlayer from 'react-player/lazy';

const videos = [
    'https://cdn.rtfkt.com/assets/banners/pod-burning/bg2.mp4',
    'https://cdn.rtfkt.com/assets/banners/animus/animus-final.mp4',
    'https://cdn.rtfkt.com/assets/banners/world-merging/banner-wm-chip-loop.mp4',
];

export type VideoProps = ReactPlayerProps;

const CustomVideo = (props: VideoProps) => {
    const [showPlayer, setShowPlayer] = useState(false);

    useMount(() => {
        setShowPlayer(true);
    });
    return showPlayer ? (
        <ReactPlayer
            url={props.url || videos[0]}
            playing={true}
            loop={true}
            muted={true} //  for autoplay
            controls={false}
            onReady={() => {
                console.log('video ready');
            }}
            {...props}
        />
    ) : null;
};

export default CustomVideo;
