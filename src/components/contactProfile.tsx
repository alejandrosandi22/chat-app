import { useAppSelector } from 'hooks';
import useRemoveContact from 'hooks/useRemoveContact';
import client from 'services/apolloClient';

export default function ContactProfile() {
  const { contact } = useAppSelector((state) => state.selectContact);
  const { removeContact } = useRemoveContact();

  const handleRemoveContact = () => {
    removeContact({
      onCompleted: async () => {
        await client.resetStore();
      },
      variables: {
        removeContactId: contact?.id,
      },
    });
  };

  return (
    <>
      <div className='contact-profile'>
        <div className='contact-profile-cover-photo-wrapper'>
          {contact?.cover_photo && (
            <img
              className='contact-profile-cover-photo'
              src={contact?.cover_photo}
              alt='cover_photo'
            />
          )}
        </div>
        <section>
          <img
            className='contact-profile-avatar'
            src={contact?.avatar}
            alt=''
          />
          <h1 className='contact-profile-name'>{contact?.name}</h1>
          <p className='contact-profile-username'>@{contact?.username}</p>
        </section>
        <div className='contact-profile-button-wrapper'>
          <button onClick={handleRemoveContact}>
            Remove user from contacts
          </button>
        </div>
      </div>
      <style jsx>
        {`
          .contact-profile {
            position: relative;
            overflow: hidden;
            width: 100%;
            min-width: 300px;
            height: 100%;
            transition: all 0.5s;
            .contact-profile-cover-photo-wrapper {
              width: 100%;
              min-height: 155px;
              object-fit: cover;
              img {
                width: 100%;
                min-height: 155px;
                object-fit: cover;
              }
            }
            section {
              margin: -50px 0 0 0;
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              .contact-profile-avatar {
                width: 100px;
                aspect-ratio: 1 / 1;
              }
              .contact-profile-name {
                width: 100%;
                font-size: 1.5rem;
                text-align: center;
                color: var(--primary-font-color);
              }
              .contact-profile-username {
                width: 100%;
                font-size: 1.25rem;
                text-align: center;
                color: var(--primary-font-color);
              }
            }
            .contact-profile-button-wrapper {
              position: absolute;
              bottom: 30px;
              width: 100%;
              display: grid;
              place-items: center;
              button {
                border: none;
                outline: none;
                color: var(--primary-font-color);
                background: var(--secondary);
                padding: 9px 20px;
                border-radius: 15px;
                white-space: nowrap;
                &:hover {
                  background: var(--secondary-font-color);
                }
              }
            }
          }
        `}
      </style>
    </>
  );
}
