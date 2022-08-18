import Search from 'components/search';
import getContacts from 'hooks/useGetContacts';
import ContactsList from './contactsList';

export default function Contacts() {
  const { contacts, loading } = getContacts();

  return (
    <>
      <div className='contacts-wrapper'>
        <div className='contacts-search-wrapper'>
          <Search />
        </div>
        {(!loading || contacts) && <ContactsList contacts={contacts} />}
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
