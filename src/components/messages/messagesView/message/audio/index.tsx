import { useCalculateTime } from 'hooks';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ControlPanel from './controls/controlPanel';
import Slider from './slider';

export default function Audio({ src }: { src: string }) {
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const audioTime = useCalculateTime(
    percentage === 0 || percentage === 100 ? duration : currentTime
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const value = Number(e.target.value);
      audioRef.current.currentTime = (audioRef.current.duration / 100) * value;
      setPercentage(value);
    }
  };

  const play = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;

      if (!isPlaying) {
        setIsPlaying(true);
        audioRef.current.play();
      }

      if (isPlaying) {
        setIsPlaying(false);
        audioRef.current.pause();
      }
    }
  };

  const getCurrentDuration = (currentTarget: HTMLAudioElement) => {
    const percent = (
      (currentTarget.currentTime / currentTarget.duration) *
      100
    ).toFixed(2);
    const time = currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(Number(time.toFixed(2)));
  };

  useEffect(() => {
    if (percentage === 100) {
      setIsPlaying(false);
    }
  }, [percentage]);

  return (
    <>
      <div className='audio-wrapper'>
        <ControlPanel
          play={play}
          isPlaying={isPlaying}
          currentTime={currentTime}
        />
        <div className='audio-slider-container'>
          <Slider percentage={percentage} onChange={handleInputChange} />
        </div>
        <span className='audio-time'>{audioTime}</span>
        <audio
          ref={audioRef}
          onTimeUpdate={(e) => getCurrentDuration(e.currentTarget)}
          onLoadedData={(e) => {
            setDuration(Number(e.currentTarget.duration.toFixed(2)));
          }}
          src={src}
        ></audio>
      </div>
      <style jsx>{`
        .audio-wrapper {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          .audio-slider-container {
            width: 70%;
          }
          .audio-time {
            font-size: 1rem;
            color: var(--primary-font-color);
          }
        }
      `}</style>
    </>
  );
}
