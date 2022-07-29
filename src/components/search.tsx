import { useState } from 'react';

export default function Search() {
  const [search, setSearch] = useState<string>('');

  return (
    <>
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
        />
      </form>
      <style jsx>{`
        form {
          position: relative;
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
      `}</style>
    </>
  );
}
