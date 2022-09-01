import Link from 'next/link';

export default function SocialSignIn() {
  return (
    <>
      <div className='social-wrapper'>
        <Link href='/api/auth/facebook'>
          <a className='social-item facebook'>
            <i className='fab fa-facebook social-item-icon' />
            <span className='social-item-caption'>Sign In With Facebook</span>
          </a>
        </Link>
        <Link href='/api/auth/google'>
          <a className='social-item google'>
            <i className='fab fa-google social-item-icon' />
            <span className='social-item-caption'>Sign In With Google</span>
          </a>
        </Link>
        <Link href='/api/auth/github'>
          <a className='social-item github'>
            <i className='fab fa-github social-item-icon' />
            <span className='social-item-caption'>Sign In With Github</span>
          </a>
        </Link>
      </div>
      <style jsx>{`
        .social-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 40px 0 20px 0;
          gap: 20px;
          .social-item {
            text-decoration: none;
            display: flex;
            align-items: center;
            width: 250px;
            height: 40px;
            padding: 5px 10px;
            gap: 15px;
            background: var(--primary);
            color: var(--white);
            .social-item-icon {
              font-size: 20px;
              display: flex;
              align-items: center;
              width: 30px;
              height: 100%;
              border-right: 1px solid var(--white);
            }
            &:hover {
              filter: brightness(0.95);
            }
          }
          .facebook {
            background: #3b5998;
          }
          .google {
            background: #dd4b39;
          }
          .github {
            background: #222222;
          }
        }

        @media (max-width: 768px) {
          .social-wrapper {
            .social-item {
              width: 100%;
            }
          }
        }
      `}</style>
    </>
  );
}
