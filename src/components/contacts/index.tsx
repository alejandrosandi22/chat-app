import useGetContacts from 'hooks/useGetContacts';
import { useEffect, useState } from 'react';
import { UserType } from 'types';
import ContactsList from './contactsList';
import SearchContact from './searchContact';

export default function Contacts() {
  const { contacts, loading } = useGetContacts();
  const [result, setResult] = useState<UserType[]>([]);

  useEffect(() => {
    if (contacts) setResult(contacts);
  }, [contacts]);

  return (
    <>
      <div className='contacts-wrapper'>
        <div className='contacts-search-wrapper'>
          <SearchContact contacts={contacts} setResult={setResult} />
        </div>
        {(!loading || contacts) && <ContactsList contacts={result} />}
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
