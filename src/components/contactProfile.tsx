import { useAppSelector } from 'hooks';

export default function ContactProfile() {
  const { contact } = useAppSelector((state) => state.selectContact);
  return (
    <>
      <div className='contact-profile'>
        <img src={contact?.cover_photo} alt='' />
        <section>
          <img src={contact?.avatar} alt='' />
        </section>
      </div>
      <style jsx>
        {`
          .contact-profile {
            width: 100%;
            height: 100%;
            transition: 0.5s;
          }
        `}
      </style>
    </>
  );
}
