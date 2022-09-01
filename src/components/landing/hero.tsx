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
          width: 100%;
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
              margin: 10px 0;
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

        @media (max-width: 768px) {
          section {
            display: flex;
            padding: 0;
            .features-gradients {
              .features-gradient {
                &:nth-child(1) {
                  width: 200px;
                  height: 100px;
                  top: 40%;
                  left: 20%;
                  background-color: var(--secondary-font-color);
                }
                &:nth-child(2) {
                  width: 150px;
                  height: 100px;
                  top: 60%;
                  left: 10%;
                  background-color: var(--primary);
                }
                &:nth-child(3) {
                  width: 150px;
                  height: 100px;
                  top: 50%;
                  left: 0%;
                  background-color: var(--secondary);
                }
              }
            }
            div {
              padding: 0 10px;
              h1 {
                color: var(--primary-font-color);
                font-size: 4rem;
                font-weight: 500;
              }
              p {
                margin: 10px 0;
                color: var(--secondary-font-color);
                font-size: 1rem;
              }
              a {
                width: 100%;
              }
            }
            .image-wrapper {
              display: none;
            }
          }
        }
      `}</style>
    </>
  );
}
