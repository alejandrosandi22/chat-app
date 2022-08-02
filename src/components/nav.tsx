import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Nav({
  toggle,
  handleToggle,
}: {
  toggle?: boolean;
  handleToggle?: () => void;
}) {
  const { pathname } = useRouter();

  return (
    <>
      <nav>
        <ul className='logo-list'>
          <li className='logo-list-item'>
            <Image src='/static/images/logo.webp' layout='fill' alt='logo' />
          </li>
        </ul>
        <ul className='nav-links-list'>
          <li className='nav-links-list-item'>
            <Link href='/chat'>
              <a
                className={
                  pathname === '/chat'
                    ? 'nav-links-list-link-active'
                    : 'nav-links-list-link'
                }
              >
                <i className='fal fa-comment-lines nav-link-list-icon'></i>
              </a>
            </Link>
          </li>
          <li className='nav-links-list-item'>
            <Link href='/username'>
              <a
                className={
                  pathname === '/[username]'
                    ? 'nav-links-list-link-active'
                    : 'nav-links-list-link'
                }
              >
                <i className='fal fa-user'></i>
              </a>
            </Link>
          </li>
          <li className='nav-links-list-item'>
            <Link href='/settings'>
              <a
                className={
                  pathname === '/settings'
                    ? 'nav-links-list-link-active'
                    : 'nav-links-list-link'
                }
              >
                <i className='fal fa-cog'></i>
              </a>
            </Link>
          </li>
          {toggle && (
            <li onClick={handleToggle} className='nav-links-list-item'>
              <i className='fal fa-angle-double-left nav-links-list-item-icon'></i>
            </li>
          )}
        </ul>
        <ul className='nav-sign-out-list'>
          <li className='nav-sign-out-list-item'>
            <Link href='/'>
              <a className='nav-sign-out-list-item-link'>
                <i className='fal fa-sign-out'></i>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>
        {`
          nav {
            z-index: 50;
            position: relative;
            width: 5%;
            height: 100%;
            display: flex;
            flex-direction: column;
            background: var(--primary);
            .logo-list {
              height: 70px;
              width: 100%;
              display: grid;
              place-items: center;
              list-style: none;
              .logo-list-item {
                position: relative;
                width: 50px;
                height: 50px;
              }
            }
            .nav-links-list {
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              width: 100%;
              height: calc(100% - 140px);
              list-style: none;
              padding: 10px 0;
              .nav-links-list-item {
                height: 40px;
                width: 95%;
                margin: 10px 0;
                display: flex;
                justify-content: center;
                .nav-links-list-item-icon {
                  align-self: center;
                  transform: rotateY(${toggle ? '180deg' : '0deg'});
                  font-size: 1.5rem;
                  color: var(--secondary-font-color);
                  transition: 0.25s;
                  cursor: pointer;
                  &:hover {
                    color: var(--primary-font-color);
                  }
                }
                .nav-links-list-link {
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  text-decoration: none;
                  &:hover {
                    i {
                      color: var(--primary-font-color);
                    }
                  }
                  i {
                    font-size: 18px;
                    color: var(--secondary-font-color);
                  }
                }
                .nav-links-list-link-active {
                  width: 100%;
                  height: 100%;
                  background: var(--background);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 15px 0 0 15px;
                  text-decoration: none;
                  i {
                    font-size: 18px;
                    color: var(--primary-font-color);
                  }
                }
              }
            }
            .nav-sign-out-list {
              width: 100%;
              height: 70px;
              display: grid;
              place-items: center;
              list-style: none;
              .nav-sign-out-list-item {
                .nav-sign-out-list-item-link {
                  font-size: 18px;
                  color: var(--secondary-font-color);
                }
              }
            }
          }
        `}
      </style>
    </>
  );
}
