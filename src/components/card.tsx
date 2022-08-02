export default function Card() {
  return (
    <>
      <div className='card'>
        <ul className='card-list'>
          <li className='card-list-item'>
            <i className='fal fa-ellipsis-v card-list-item-icon' />
            <ul className='card-list-options'>
              <li className='card-list-options-item'>Remove from contacts</li>
            </ul>
          </li>
        </ul>
        <div className='card-contact-info-wrapper'>
          <img
            className='card-contact-info-avatar'
            src='https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745'
            alt='avatar'
          />
          <div className='card-contact-info-text-wrapper'>
            <p className='card-contact-info-name'>User Name</p>
            <p className='card-contact-info-username'>@username</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .card {
          position: relative;
          height: 270px;
          aspect-ratio: 3 / 4;
          background: var(--background);
          .card-list {
            z-index: var(--z-10);
            position: absolute;
            list-style: none;
            top: 10px;
            right: 5px;
            .card-list-item {
              .card-list-item-icon {
                font-size: 24px;
                width: 20px;
                text-align: center;
                color: var(--secondary-font-color);
                &:hover {
                  color: var(--primary-font-color);
                }
                &:hover ~ .card-list-options {
                  display: block;
                }
              }
              .card-list-options {
                display: none;
                position: absolute;
                right: -5px;
                background: var(--background);
                border: 1px solid var(--secondary);
                list-style: none;
                &:hover {
                  display: block;
                }
                .card-list-options-item {
                  width: 180px;
                  text-align: center;
                  padding: 5px;
                  color: var(--primary-font-color);
                  cursor: default;
                  &:hover {
                    display: block;
                    background: var(--secondary);
                  }
                }
              }
            }
          }
          .card-contact-info-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            .card-contact-info-avatar {
              border-radius: 50%;
              width: 130px;
              aspect-ratio: 1 / 1;
            }
            .card-contact-info-text-wrapper {
              .card-contact-info-name {
                text-align: center;
                font-size: 20px;
                color: var(--primary-font-color);
              }
              .card-contact-info-username {
                text-align: center;
                font-size: 15px;
                color: var(--secondary-font-color);
              }
            }
          }
        }
      `}</style>
    </>
  );
}
