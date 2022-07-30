import { UserType } from 'types';
import ContactCard from './contactCard';

export default function ContactsList({ contacts }: { contacts: UserType[] }) {
  return (
    <>
      <div className='contacts-list'>
        {contacts.map((contact: UserType) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
      <style jsx>{`
        .contacts-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 0;
          width: 100%;
          height: calc(100% - 70px);
          overflow-y: auto;
          gap: 10px;
        }
      `}</style>
    </>
  );
}
