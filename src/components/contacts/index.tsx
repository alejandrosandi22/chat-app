import Search from 'components/search';
import { UserType } from 'types';
import ContactsList from './contactsList';

export default function Contacts() {
  const data = [] as UserType[];
  const loading = true;

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
