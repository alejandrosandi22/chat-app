import Search from 'components/search';
import useGetContacts from 'hooks/useGetContacts';
import ContactsList from './contactsList';

export default function Contacts() {
  const { data, loading } = useGetContacts(1);

  return (
    <>
      <div className='contacts-wrapper'>
        <div className='contacts-search-wrapper'>
          <Search />
        </div>
        {(!loading || data) && <ContactsList contacts={data} />}
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
