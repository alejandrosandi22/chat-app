import AppLayout from 'common/appLayout';
import Footer from 'components/landing/footer';
import Hero from 'components/landing/hero';
import Navbar from 'components/landing/navbar';

export default function Home() {
  return (
    <>
      <AppLayout title='Chat App'>
        <div className='landing-container'>
          <Navbar />
          <Hero />
          <Footer />
        </div>
      </AppLayout>
      <style jsx>{`
        .landing-container {
          position: absolute;
          width: 100%;
          background: var(--background);
        }
      `}</style>
    </>
  );
}
