export default function Footer() {
  return (
    <>
      <footer>
        <p>Copyright © 2022 Alejandro Sandí. All rights reserved.</p>
        <ul>
          <li>
            <a
              href='https://github.com/alejandrosandi22/chat-app'
              target='_blank'
              rel='noreferrer'
            >
              <i className='fab fa-github' />
            </a>
          </li>
          <li>
            <a
              href='https://alejandrosandi.com'
              target='_blank'
              rel='noreferrer'
            >
              <i className='fal fa-laptop' />
            </a>
          </li>
        </ul>
        <a
          className='logo'
          href='https://alejandrosandi.com'
          target='_blank'
          rel='noreferrer'
        >
          <img src='/static/images/logo.webp' alt='' />
        </a>
      </footer>
      <style jsx>{`
        footer {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          padding: 10px;
          p {
            color: var(--primary-font-color);
          }
          ul {
            list-style: none;
            display: flex;
            li {
              padding: 0 15px;
              &:last-child {
                border-left: 1px solid var(--primary-font-color);
              }
              a {
                text-decoration: none;
                &:hover {
                  i {
                    color: var(--primary-font-color);
                  }
                }
                i {
                  color: var(--secondary-font-color);
                }
              }
            }
          }
          .logo {
            img {
              width: 64px;
            }
          }
        }
      `}</style>
    </>
  );
}
