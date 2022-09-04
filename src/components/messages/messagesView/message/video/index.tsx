import Slider from 'components/messages/messagesView/message/audio/slider';
import useCalculateTime from 'hooks/useCalculateTime';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export default function Video({ src }: { src: string }) {
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scale] = useState<boolean>(false);

  const [moveStyle, setMoveStyle] = useState<boolean>(false);

  const videoTime = useCalculateTime(
    percentage === 0 || percentage === 100 ? duration : currentTime
  );

  const getCurrentDuration = (currentTarget: HTMLAudioElement) => {
    const percent = (
      (currentTarget.currentTime / currentTarget.duration) *
      100
    ).toFixed(2);
    const time = currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(Number(time.toFixed(2)));
  };

  const handlePlay = () => {
    if (videoRef.current) {
      if (!isPlaying) {
        setIsPlaying(true);
        videoRef.current.play();
      }
      if (isPlaying) {
        setIsPlaying(false);
        videoRef.current.pause();
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const value = Number(e.target.value);
      videoRef.current.currentTime = (videoRef.current.duration / 100) * value;
      setPercentage(value);
    }
  };

  useEffect(() => {
    if (percentage === 100) {
      setIsPlaying(false);
    }
  }, [percentage]);

  useEffect(() => {
    setTimeout(() => {
      if (moveStyle === true) {
        setMoveStyle(false);
      }
    }, 1000);
  }, [moveStyle]);

  return (
    <>
      <div className={`video-wrapper ${scale ? 'video-wrapper-scalable' : ''}`}>
        {scale && (
          <button className='video-scalable-exit'>
            <i className='fal fa-long-arrow-left video-scalable-exit-icon' />
          </button>
        )}
        <video
          onMouseMove={() => setMoveStyle(true)}
          onClick={() => {
            handlePlay();
          }}
          className='video'
          ref={videoRef}
          onTimeUpdate={(e) => getCurrentDuration(e.currentTarget)}
          onLoadedData={(e) => {
            setDuration(Number(e.currentTarget.duration.toFixed(2)));
          }}
          preload='metadata'
          src={src}
        ></video>
        <button
          className={`video-play-button ${
            isPlaying ? 'video-play-button-playing' : ''
          }`}
          style={{
            opacity: moveStyle ? 1 : 0,
            animation: moveStyle
              ? 'fadeIn 0.3s ease-in-out both 1s'
              : 'fadeOut 0s',
          }}
          onClick={handlePlay}
        >
          <i className={!isPlaying ? 'fas fa-play' : 'fas fa-pause'} />
        </button>
        {scale && (
          <div
            className='video-controls-wrapper'
            onMouseMove={() => setMoveStyle(true)}
            style={{
              opacity: moveStyle ? 1 : 0,
              animation: moveStyle
                ? 'fadeIn 0.3s ease-in-out both 1s'
                : 'fadeOut 0s',
            }}
          >
            <Slider percentage={percentage} onChange={handleInputChange} />
            <span className='video-time'>{videoTime}</span>
          </div>
        )}
      </div>

      <style jsx>{`
        .video-wrapper {
          transition: 0.5s;
          position: relative;
          overflow: hidden;
          .video-scalable-exit {
            position: absolute;
            top: 20px;
            left: 25px;
            border: none;
            outline: none;
            font-size: 2rem;
            background: transparent;
            color: var(--white);
            cursor: pointer;
            &:hover {
              transform: scale(1.1);
            }
          }
          .video-controls-wrapper {
            background: linear-gradient(transparent, rgba(17, 17, 17, 0.8));
            position: absolute;
            padding: 10px;
            bottom: 0;
            width: 100%;
            display: flex;
            gap: 10px;
            opacity: 0;
            transition: all 0.3s ease;
            &:hover {
              opacity: 1;
            }
            .video-time {
              color: var(--primary-font-color);
            }
          }
          .video-play-button {
            z-index: var(--z-10);
            opacity: 1;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary);
            color: var(--primary-font-color);
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            &:hover {
              opacity: 1;
              background: var(--secondary);
            }
          }
          .video-play-button-playing {
            opacity: 0;
          }
          .video {
            max-width: 100%;
            max-height: 100%;
            border-radius: 5px;
          }
        }
        .video-wrapper-scalable {
          z-index: 9999999;
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(17, 17, 17, 0.801);
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          transition: 0.5s;
          .video {
            border-radius: 0px;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
