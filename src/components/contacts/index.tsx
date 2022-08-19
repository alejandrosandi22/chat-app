import Search from 'components/search';
import useGetContacts from 'hooks/useGetContacts';
import { UserType } from 'types';
import ContactsList from './contactsList';

export default function Contacts({ currentUser }: { currentUser: UserType }) {
  const { contacts, loading } = useGetContacts();

  return (
    <>
      <div className='contacts-wrapper'>
        <div className='contacts-search-wrapper'>
          <Search currentUser={currentUser} />
        </div>
        {(!loading || contacts) && (
          <ContactsList currentUser={currentUser} contacts={contacts} />
        )}
      </div>
      <style jsx>{`
        .contacts-wrapper {
          width: 100%;
          height: 100%;
          background: var(--background);
          transition: 0.5s;
          overflow: hidden;
          .contacts-search-wrapper {
            width: 100%;
            height: 70px;
            background: var(--primary);
          }
        }
      `}</style>
    </>
  );
}
