import { useState, useRef, useEffect, ChangeEventHandler } from 'react';

function Slider({
  percentage = 0,
  onChange,
}: {
  percentage: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const rangeRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rangeRef.current && thumbRef.current) {
      const rangeWidth = rangeRef.current.getBoundingClientRect().width;
      const thumbWidth = thumbRef.current.getBoundingClientRect().width;
      const centerThumb = (thumbWidth / 100) * percentage * -1;
      const centerProgressBar =
        thumbWidth +
        (rangeWidth / 100) * percentage -
        (thumbWidth / 100) * percentage;
      setPosition(percentage);
      setMarginLeft(centerThumb);
      setProgressBarWidth(centerProgressBar);
    }
  }, [percentage]);

  return (
    <>
      <div className='audio-slider-container'>
        <div
          className='audio-progress-bar-cover'
          style={{
            width: `${progressBarWidth}px`,
          }}
        ></div>
        <div
          className='thumb'
          ref={thumbRef}
          style={{
            left: `${position}%`,
            marginLeft: `${marginLeft}px`,
          }}
        ></div>
        <input
          type='range'
          value={position}
          ref={rangeRef}
          step='0.01'
          className='range'
          onChange={onChange}
        />
      </div>
      <style jsx>
        {`
          .audio-slider-container {
            --thumb-width: 20px;
            --thumb-height: 20px;
            --progress-bar-height: 4px;
            position: relative;
            width: 70%;
            &::before {
              content: '';
              background-color: var(--primary-font-color);
              width: 99%;
              height: calc(var(--progress-bar-height) - 1px);
              display: block;
              position: absolute;
              border-radius: 10px;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              pointer-events: none;
            }
            .audio-progress-bar-cover {
              background-color: var(--secondary-font-color);
              width: 0%;
              height: var(--progress-bar-height);
              display: block;
              position: absolute;
              border-radius: 10px;
              top: 50%;
              transform: translateY(-50%);
              z-index: 1;
              user-select: none;
              pointer-events: none;
            }
            .range,
            .thumb {
              width: var(--thumb-width);
              height: var(--thumb-height);
              box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.753);
              z-index: 3;
              background: rgb(255, 255, 255);
              position: absolute;
              border-radius: 50%;
              top: 50%;
              transform: translate(0%, -50%);
              pointer-events: none;
              user-select: none;
            }
            .range {
              -webkit-appearance: none;
              background-color: rgba(240, 9, 9, 0.397);
              height: 10px;
              width: 100%;
              cursor: pointer;
              opacity: 0;
              margin: 0 auto;
              &::-webkit-slider-thumb {
                width: var(--thumb-width);
                height: var(--thumb-height);

                background: #350f2d;
                border: 1px solid #000000;
                border-radius: 50%;
                cursor: pointer;
                -webkit-appearance: none;
              }
            }
          }
        `}
      </style>
    </>
  );
}

export default Slider;
