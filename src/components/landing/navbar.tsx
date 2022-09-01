import { ThemeContext } from 'context/theme';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [scroll, setScroll] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) return setScroll(true);
      setScroll(false);
    });
  }, []);

  return (
    <>
      <nav>
        <Link href='/'>
          <a className='logo'>
            <img src='/static/images/charla.png' alt='logo' />
            <span>Chat App</span>
          </a>
        </Link>
        <ul className='start-list'>
          <li>
            <input
              type='checkbox'
              name='theme'
              id='theme'
              hidden
              onChange={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}
            />
            <label htmlFor='theme'>
              {theme === 'dark' ? (
                <i className='fal fa-sun' />
              ) : (
                <i className='fal fa-moon' />
              )}
            </label>
          </li>
          <li>
            <Link href='/chat'>
              <a className='start-chat'>
                <span>Start chat</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        nav {
          padding: 0 7rem;
          z-index: 50;
          position: fixed;
          height: 64px;
          width: 100%;
          background: ${scroll ? 'var(--background-opacity)' : 'none'};
          display: flex;
          justify-content: space-between;
          align-items: center;
          backdrop-filter: blur(5px);
          ${scroll
            ? 'border-bottom: 1px solid var(--secondary-font-color);'
            : ''}
          transition: 0.5s;
          .logo {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            img {
              margin: 0 15px 0 0;
              filter: ${theme === 'dark' && 'brightness(800%)'};
              height: 40px;
              aspect-ratio: 1 / 1;
            }
            span {
              font-size: 1.5rem;
              font-weight: 300;
              color: var(--primary-font-color);
              border-left: 1px solid var(--primary-font-color);
              padding-left: 15px;
            }
          }
          .list-links {
            list-style: none;
            display: flex;
            gap: 50px;
            li {
              a {
                text-decoration: none;
                color: var(--primary-font-color);
                cursro: pointer;
                &:hover {
                  color: var(--secondary-font-color);
                }
              }
            }
          }
          .start-list {
            display: flex;
            height: 100%;
            list-style: none;
            align-items: center;
            gap: 20px;
            li {
              label {
                color: var(--primary-font-color);
                cursor: pointer;
              }
              .start-chat {
                background: transparent;
                border: 1px solid var(--primary-font-color);
                padding: 8px 12px;
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
                }
              }
            }
          }
        }

        @media (max-width: 768px) {
          nav {
            padding: 0 30px;
            .logo {
              span {
                display: none;
              }
            }
          }
        }
      `}</style>
    </>
  );
}
