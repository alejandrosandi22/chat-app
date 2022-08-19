import useErrorImage from 'hooks/useErrorImage';
import useRemoveContact from 'hooks/useRemoveContact';
import Link from 'next/link';
import { UserType } from 'types';

export default function Card({
  contact,
  currentUser,
}: {
  contact: UserType;
  currentUser: boolean;
}) {
  const { imageOnError } = useErrorImage();
  const { removeContact, loading } = useRemoveContact();

  const handleRemoveContact = () => {
    removeContact({
      variables: {
        removeContactId: contact.id,
      },
    });
  };

  return (
    <>
      <div className='card'>
        <ul className='card-list'>
          {loading && <h1>Loading ..</h1>}
          {currentUser && (
            <li className='card-list-item'>
              <i className='fal fa-ellipsis-v card-list-item-icon' />
              <ul className='card-list-options'>
                <li
                  onClick={handleRemoveContact}
                  className='card-list-options-item'
                >
                  Remove from contacts
                </li>
              </ul>
            </li>
          )}
        </ul>
        <div className='card-contact-info-wrapper'>
          <Link href={`/${contact.username}`}>
            <a>
              <img
                className='card-contact-info-avatar'
                src={contact.avatar}
                onError={imageOnError}
                alt='avatar'
              />
            </a>
          </Link>
          <div className='card-contact-info-text-wrapper'>
            <Link href={`/${contact.username}`}>
              <a className='card-contact-info-name'>{contact.name}</a>
            </Link>
            <p className='card-contact-info-username'>@{contact.username}</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .card {
          position: relative;
          height: 270px;
          aspect-ratio: 3 / 4;
          background: var(--primary);
          .card-list {
            z-index: var(--z-10);
            position: absolute;
            list-style: none;
            top: 10px;
            right: 5px;
            .card-list-item {
              .card-list-item-icon {
                font-size: 24px;
                width: 20px;
                text-align: center;
                color: var(--secondary-font-color);
                &:hover {
                  color: var(--primary-font-color);
                }
                &:hover ~ .card-list-options {
                  display: block;
                }
              }
              .card-list-options {
                display: none;
                position: absolute;
                right: -5px;
                background: var(--background);
                border: 1px solid var(--secondary);
                list-style: none;
                &:hover {
                  display: block;
                }
                .card-list-options-item {
                  width: 180px;
                  text-align: center;
                  padding: 5px;
                  color: var(--primary-font-color);
                  cursor: default;
                  &:hover {
                    display: block;
                    background: var(--secondary);
                  }
                }
              }
            }
          }
          .card-contact-info-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            .card-contact-info-avatar {
              border-radius: 50%;
              width: 130px;
              aspect-ratio: 1 / 1;
              text-decoration: none;
            }
            .card-contact-info-text-wrapper {
              width: 100%;
              display: flex;
              flex-direction: column;
              .card-contact-info-name {
                text-align: center;
                width: 100%;
                font-size: 20px;
                color: var(--primary-font-color);
                text-decoration: none;
              }
              .card-contact-info-username {
                text-align: center;
                font-size: 15px;
                width: 100%;
                color: var(--secondary-font-color);
              }
            }
          }
        }
      `}</style>
    </>
  );
}
