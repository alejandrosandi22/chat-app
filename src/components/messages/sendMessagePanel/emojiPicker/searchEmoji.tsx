import { Dispatch, SetStateAction, useEffect } from 'react';
import searchEmojis from 'services/searchEmojis';
import { EmojiType } from 'types';

interface SearchEmojiProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setEmojis: Dispatch<SetStateAction<EmojiType[]>>;
}

export default function SearchEmoji({
  search,
  setSearch,
  setEmojis,
}: SearchEmojiProps) {
  const handleSearch = () => {
    searchEmojis({ search }).then((emojis) => setEmojis(emojis));
  };

  useEffect(() => {
    if (search !== '') {
      handleSearch();
    }
  }, [search]);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type='text'
          id='emoji-search'
          name='emoji-search'
          placeholder='Search'
          autoComplete='off'
        />
        <label htmlFor='emoji-search'>
          {search !== '' ? (
            <i
              onClick={() => setSearch('')}
              className='fal fa-times-circle search-icon'
            />
          ) : (
            <i className='fal fa-search' />
          )}
        </label>
      </form>
      <style jsx>{`
        form {
          position: relative;
          width: 100%;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px 0;
          label {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
            border-left: 1px solid var(--secondary-font-color);
            right: 10px;
            height: 80%;
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
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            background: var(--primary);
            color: var(--primary-font-color);
            font-size: 1rem;
            border: 1px solid transparent;
            padding: 0 50px 0 1rem;
            border-radius: 10px;
            &::placeholder {
              color: var(--secondary-font-color);
              font-weight: 300;
            }
            &:focus,
            &:active,
            &:focus-within {
              border: 1px solid var(--secondary-font-color);
            }
          }
        }
      `}</style>
    </>
  );
}
