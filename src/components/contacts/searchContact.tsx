import { useEffect, useState } from 'react';
import { UserType } from 'types';

export default function SearchContact({
  contacts,
  setResult,
}: {
  contacts: UserType[];
  setResult: (result: UserType[]) => void;
}) {
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (search === '') return setResult(contacts);

    const filterResult = contacts.filter(
      (contact) =>
        contact.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        contact.username
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
    );

    setResult(filterResult);
  }, [search]);

  return (
    <>
      <div className='search-container'>
        <form>
          <label htmlFor='search'>
            {search !== '' ? (
              <i
                onClick={() => setSearch('')}
                className='fal fa-times-circle search-icon'
              />
            ) : (
              <i className='fal fa-search' />
            )}
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type='text'
            id='search'
            name='search'
            placeholder='Search'
            autoComplete='off'
          />
        </form>
      </div>
      <style jsx>{`
        .search-container {
          position: relative;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          form {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            label {
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0 10px;
              border-left: 1px solid var(--secondary-font-color);
              right: 20px;
              height: 50%;
              .search-icon {
                cursor: pointer;
                &:hover {
                  color: var(--primary-font-color);
                }
              }
              i {
                color: var(--secondary-font-color);
              }
            }
            input {
              width: 90%;
              height: 80%;
              border: none;
              outline: none;
              background: transparent;
              color: var(--secondary-font-color);
              font-size: 1rem;
              padding: 0 50px 0 1rem;
              border-radius: 15px;
              &::placeholder {
                color: var(--secondary-font-color);
              }
              &:focus,
              &:active,
              &:focus-within {
                border: 1px solid var(--secondary);
              }
            }
          }
        }
      `}</style>
    </>
  );
}
