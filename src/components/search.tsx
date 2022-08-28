import useGetCurrentUser from 'hooks/user/useGetCurrentUser';
import useSearch from 'hooks/useSearch';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UserType } from 'types';

export function SearchResults({ results }: { results: UserType[] }) {
  const { currentUser } = useGetCurrentUser();
  return (
    <>
      {results.map((user: UserType) => {
        let avatar = 'static/images/user.png';
        if (user.show_profile_photo === 'only-contacts') {
          if (user.contacts.includes(currentUser.id)) avatar = user.avatar;
        }
        if (user.show_profile_photo === 'public') {
          avatar = user.avatar;
        }
        return (
          <Link key={user.id} href={`/${user.username}`}>
            <a>
              <section>
                <img src={avatar} alt={user.username} />
                <div>
                  <p>{user.name}</p>
                  <p>@{user.username}</p>
                </div>
              </section>
            </a>
          </Link>
        );
      })}
      <style jsx>{`
        a {
          text-decoration: none;
          section {
            width: 100%;
            height: 60px;
            background: var(--primary);
            display: flex;
            align-items: center;
            padding: 20px;
            overflow: hidden;
            &:hover {
              background: var(--secondary);
              div {
                p {
                  &:last-child {
                    color: var(--primary-font-color);
                  }
                }
              }
            }
            img {
              width: 35px;
              height: 35px;
              border-radius: 50%;
            }
            div {
              display: flex;
              flex-direction: column;
              p {
                margin-left: 10px;
                color: var(--primary-font-color);
                font-size: 16px;
                &:last-child {
                  font-size: 14px;
                  color: var(--secondary-font-color);
                }
              }
            }
          }
        }
      `}</style>
    </>
  );
}

export default function Search() {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<Array<UserType>>([]);

  const { data } = useSearch(search);

  useEffect(() => {
    if (!data) return;
    setResults(data.searchUsers);
  }, [data]);

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
        <section>
          <div>{data && <SearchResults results={results} />}</div>
        </section>
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
          section {
            z-index: 50;
            position: absolute;
            top: 100%;
            width: 90%;
            border: ${data ? '1px solid var(--secondary)' : 'none'};
            border-radius: 15px;
            overflow: hidden;
            div {
              width: 100%;
              height: 100%;
              max-height: 300px;
              overflow-y: auto;
              overflow-x: hidden;
            }
          }
        }
      `}</style>
    </>
  );
}
