import { MouseEvent, useEffect } from 'react';

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

interface Props {
  setActiveGroup: (group: string) => void;
  activeGroup: string;
  handleGropingEmojis: (group: string) => void;
}

export default function EmojisGroups({
  setActiveGroup,
  activeGroup,
  handleGropingEmojis,
}: Props) {
  const handleActiveGroup = (e: MouseEvent<HTMLLIElement>) => {
    const { id } = e.currentTarget;
    setActiveGroup(id);
  };

  useEffect(() => {
    handleGropingEmojis(activeGroup);
  }, [activeGroup]);

  return (
    <>
      <nav>
        <ul>
          <li
            id={EmojiGroups.FREQUENTLY_USED}
            className={
              activeGroup === EmojiGroups.FREQUENTLY_USED ? 'active' : ''
            }
            onClick={handleActiveGroup}
          >
            <i className='fal fa-clock' />
          </li>
          <li
            id={EmojiGroups.SMILEYS_EMOTION}
            className={
              activeGroup === EmojiGroups.SMILEYS_EMOTION ? 'active' : ''
            }
            onClick={handleActiveGroup}
          >
            <i className='fal fa-smile' />
          </li>
          <li
            id={EmojiGroups.ANIMALS_NATURE}
            className={
              activeGroup === EmojiGroups.ANIMALS_NATURE ? 'active' : ''
            }
            onClick={handleActiveGroup}
          >
            <i className='fal fa-dog' />
          </li>
          <li
            id={EmojiGroups.FOOD_DRINK}
            className={activeGroup === EmojiGroups.FOOD_DRINK ? 'active' : ''}
            onClick={handleActiveGroup}
          >
            <i className='fal fa-hamburger' />
          </li>
          <li
            id={EmojiGroups.ACTIVITIES}
            className={activeGroup === EmojiGroups.ACTIVITIES ? 'active' : ''}
            onClick={handleActiveGroup}
          >
            <i className='fal fa-futbol' />
          </li>
          <li
            id={EmojiGroups.TRAVEL_PLACES}
            className={
              activeGroup === EmojiGroups.TRAVEL_PLACES ? 'active' : ''
            }
            onClick={handleActiveGroup}
          >
            <i className='fal fa-car' />
          </li>
          <li
            id={EmojiGroups.OBJECTS}
            className={activeGroup === EmojiGroups.OBJECTS ? 'active' : ''}
            onClick={handleActiveGroup}
          >
            <i className='fal fa-lightbulb' />
          </li>
          <li
            id={EmojiGroups.SYMBOLS}
            className={activeGroup === EmojiGroups.SYMBOLS ? 'active' : ''}
            onClick={handleActiveGroup}
          >
            <i className='fal fa-icons' />
          </li>
          <li
            id={EmojiGroups.FLAGS}
            className={activeGroup === EmojiGroups.FLAGS ? 'active' : ''}
            onClick={handleActiveGroup}
          >
            <i className='fal fa-flag' />
          </li>
        </ul>
      </nav>
      <style jsx>{`
        nav {
          ul {
            width: 100%;
            display: flex;
            list-style: none;
            justify-content: space-between;
            border-bottom: 1px solid var(--secondary-font-color);
            li {
              position: relative;
              display: grid;
              place-items: center;
              width: 30px;
              height: 30px;
              cursor: pointer;
              &:hover {
                i {
                  color: var(--primary-font-color);
                }
              }
              &::before {
                content: '';
                position: absolute;
                width: 0;
                height: 1.5px;
                bottom: 0;
                transition: 0.25s;
              }
              i {
                color: var(--secondary-font-color);
              }
            }
            .active {
              &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 1.5px;
                bottom: 0;
                background: var(--primary-font-color);
              }
              i {
                color: var(--primary-font-color);
              }
            }
          }
        }
      `}</style>
    </>
  );
}
