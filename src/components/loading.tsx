import AppLayout from 'common/appLayout';

export default function Loading() {
  return (
    <>
      <AppLayout title='Chat App | Loading ...'>
        <section>
          <i className='fal fa-spinner-third' />
        </section>
      </AppLayout>
      <style jsx>{`
        section {
          position: absolute;
          background: var(--primary);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .fal {
            font-size: 3rem;
            color: var(--primary-font-color);
            animation: spin 1s infinite;
          }
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
