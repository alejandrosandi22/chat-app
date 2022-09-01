import Link from 'next/link';

export default function Hero() {
  return (
    <>
      <section>
        <div className='features-gradients'>
          <div className='features-gradient'></div>
          <div className='features-gradient'></div>
          <div className='features-gradient'></div>
        </div>
        <div>
          <h1>Approach your favorite people by messages</h1>
          <p>
            This is a chat application developed as a personal practice, you can
            use all the features that you find in it.
          </p>
          <Link href='/chat'>
            <a>
              <span>Start Chat</span>
            </a>
          </Link>
        </div>
        <div className='image-wrapper'>
          <img
            src='/static/images/chat-text-dynamic-clay.png'
            alt='chat-text'
          />
        </div>
      </section>
      <style jsx>{`
        .features-gradients {
          width: 100%;
          height: 100%;
          position: absolute;
          background-color: rgba(1, 1, 1, 0.25);
          filter: blur(12em);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 0;
          .features-gradient {
            position: absolute;
            border-radius: 100%;
            z-index: -2;
            &:nth-child(1) {
              width: 500px;
              height: 400px;
              top: 40%;
              left: 60%;
              background-color: var(--secondary-font-color);
            }
            &:nth-child(2) {
              width: 400px;
              height: 300px;
              top: 60%;
              left: 40%;
              background-color: var(--primary);
            }
            &:nth-child(3) {
              width: 300px;
              height: 200px;
              top: 50%;
              left: 50%;
              background-color: var(--secondary);
            }
          }
        }
        section {
          position: relative;
          display: grid;
          height: 100vh;
          grid-template-columns: 50% 50%;
          grid-template-rows: 100%;
          padding: 0 7rem;
          div {
            z-index: 10;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 25px;
            h1 {
              color: var(--primary-font-color);
              font-size: 5rem;
              font-weight: 500;
            }
            p {
              margin: 10px 0 10px 0;
              color: var(--secondary-font-color);
              font-size: 1.1rem;
            }
            a {
              width: 200px;
              background: transparent;
              border: 1px solid var(--primary-font-color);
              padding: 12px;
              text-decoration: none;
              border-radius: 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              transition: 0.25s;
              &:hover {
                background: var(--primary-font-color);
                span {
                  color: var(--background);
                }
              }
              span {
                color: var(--primary-font-color);
                display: inline-block;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                font-size: 1rem;
                transition: 0.25s;
              }
            }
          }
          .image-wrapper {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              z-index: 10;
              height: 75%;
              aspect-ratio: 1 / 1;
              filter: drop-shadow(-10px 10px 10px #ffffff15);
              transition: 1s;
              &:hover {
                transform: translateY(-10px);
              }
            }
          }
        }

        @keyframes animation-1 {
          0% {
            transform: translateY(-50%) translateX(-50%) translateX(-15%)
              translateY(10%);
          }
          20% {
            transform: translateY(-50%) translateX(-50%) translateX(-20%)
              translateY(-30%);
          }
          40% {
            transform: translateY(-50%) translateX(-50%) translateX(-25%)
              translateY(-15%);
          }
          60% {
            transform: translateY(-50%) translateX(-50%) translateX(30%)
              translateY(20%);
          }
          80% {
            transform: translateY(-50%) translateX(-50%) translateX(5%)
              translateY(35%);
          }
          to {
            transform: translateY(-50%) translateX(-50%) translateX(-15%)
              translateY(10%);
          }
        }
        @keyframes animation-2 {
          0% {
            transform: translateY(-50%) translateX(-50%) rotate(-20deg)
              translateX(20%);
          }
          25% {
            transform: translateY(-50%) translateX(-50%) skew(-15deg, 15deg)
              rotate(-80deg) translateX(30%);
          }
          50% {
            transform: translateY(-50%) translateX(-50%) rotate(180deg)
              translateX(25%);
          }
          75% {
            transform: translateY(-50%) translateX(-50%) skew(-15deg, 15deg)
              rotate(240deg) translateX(15%);
          }
          to {
            transform: translateY(-50%) translateX(-50%) rotate(340deg)
              translateX(20%);
          }
        }
        @keyframes animation-3 {
          0% {
            transform: translateY(-50%) translateX(-50%) translateX(-15%)
              translateY(10%);
          }
          20% {
            transform: translateY(-50%) translateX(-50%) translateX(20%)
              translateY(-30%);
          }
          40% {
            transform: translateY(-50%) translateX(-50%) translateX(-25%)
              translateY(-15%);
          }
          60% {
            transform: translateY(-50%) translateX(-50%) translateX(30%)
              translateY(20%);
          }
          80% {
            transform: translateY(-50%) translateX(-50%) translateX(5%)
              translateY(35%);
          }
          to {
            transform: translateY(-50%) translateX(-50%) translateX(-15%)
              translateY(10%);
          }
        }
      `}</style>
    </>
  );
}
