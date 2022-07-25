import { useEffect, useRef } from 'react';

export default function Video({ video }: { video: string }) {
  const videoRef = useRef(null);

  return (
    <>
      <div className='video-controls hidden' id='video-controls'>
        <video
          ref={videoRef}
          controls
          className='video'
          id='video'
          preload='metadata'
          poster='poster.jpg'
        >
          <source src={video} type='video/mp4'></source>
        </video>
      </div>
    </>
  );
}
