import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import SearchEmoji from './searchEmoji';
import EmojisGroups from './emojisGroups';
import { EmojiType } from 'types';
import getEmojis from 'services/getEmojis';

enum EmojiGroups {
  'FREQUENTLY_USED' = 'frequently-used',
  'SMILEYS_EMOTION' = 'smileys-emotion',
  'ANIMALS_NATURE' = 'animals-nature',
  'FOOD_DRINK' = 'food-drink',
  'ACTIVITIES' = 'activities',
  'TRAVEL_PLACES' = 'travel-places',
  'OBJECTS' = 'objects',
  'PEOPLE_BODY' = 'people-body',
  'SYMBOLS' = 'symbols',
  'FLAGS' = 'flags',
}

interface EmojiPickerProps {
  setText: Dispatch<SetStateAction<string>>;
}

function EmojiPicker({ setText }: EmojiPickerProps) {
  const [emojis, setEmojis] = useState<EmojiType[]>([]);
  const [search, setSearch] = useState<string>('');
  const [gropingEmojis, setGropingEmojis] = useState<EmojiType[]>([]);
  const [activeGroup, setActiveGroup] = useState<string>(
    EmojiGroups.FREQUENTLY_USED
  );

  const handleGetEmojis = useCallback(async () => {
    await getEmojis().then((emojis) => setEmojis(emojis));
  }, []);

  const handleGropingEmojis = useCallback(
    (group: string) => {
      if (emojis && emojis.length > 0) {
        const groupEmojis = emojis.filter((emoji) => emoji.group === group);
        setGropingEmojis(groupEmojis);
      }
    },
    [emojis]
  );

  const onSelectEmoji = (emoji: EmojiType) => {
    setText((text: string) => text + emoji.character);
  };

  useEffect(() => {
    handleGetEmojis();
  }, []);

  useEffect(() => {
    if (search !== '') {
      setGropingEmojis(emojis);
    } else {
      handleGropingEmojis(activeGroup);
    }
  }, [search, emojis]);

  return (
    <>
      <div className='emojis-container'>
        <div className='emojis-groups'>
          <EmojisGroups
            handleGropingEmojis={handleGropingEmojis}
            activeGroup={activeGroup}
            setActiveGroup={setActiveGroup}
          />
        </div>
        <div className='emoji-search-wrapper'>
          <SearchEmoji
            setEmojis={setEmojis}
            search={search}
            setSearch={setSearch}
          />
        </div>
        <div className='emoji-list'>
          <ul>
            {gropingEmojis &&
              gropingEmojis.length > 0 &&
              gropingEmojis.map((emoji) => (
                <li key={emoji.slug} onClick={() => onSelectEmoji(emoji)}>
                  {emoji.character}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .emojis-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--background);
          padding: 20px;
          .emojis-groups {
            width: 100%;
          }
          .emoji-list {
            height: calc(100% - 70px);
            overflow-y: auto;
            ul {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
              gap: 5px;
              list-style: none;
              li {
                display: grid;
                place-items: center;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                cursor: pointer;
                &:hover {
                  background: var(--primary);
                }
              }
            }
          }
        }
      `}</style>
    </>
  );
}

export default React.memo(EmojiPicker);
