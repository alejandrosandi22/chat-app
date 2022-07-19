export default function Input({
  id,
  type,
  name,
  placeholder,
  value,
  onChange,
}: {
  id?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <div className='input-wrapper'>
        <input
          className='input'
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        />
        <label
          className={`label ${value !== '' ? 'label-focus' : ''}`}
          htmlFor={id}
        >
          {placeholder}
        </label>
      </div>
      <style jsx>{`
        @mixin label_focus {
          color: var(--primary-font-color);
          border-radius: 50px;
          top: 20%;
          font-size: 12px;
          background: var(--primary);
          border: 1px solid var(--white);
        }
        .input-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: 60px;
          .label {
            position: absolute;
            height: 20px;
            display: grid;
            padding: 0 10px;
            place-items: center;
            top: 50%;
            left: 5px;
            color: var(--secondary-font-color);
            font-size: 16px;
            transition: 0.25s;
          }
          .label-focus {
            @include label_focus();
            color: var(--secondary-font-color);
            border: 1px solid var(--secondary-font-color);
          }
          .input {
            width: 100%;
            height: 40px;
            font-size: 16px;
            padding: 10px 10px 0 10px;
            color: var(--primary-font-color);
            border: none;
            outline: none;
            background: transparent;
            border: 1px solid var(--secondary-font-color);
            &:focus,
            &:active,
            &:focus-within {
              border: 1px solid var(--primary-font-color);
            }
            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus,
            &:-webkit-autofill:active {
              transition-delay: 9999s;
              transition-property: background-color, color;
            }
          }
          .input:focus ~ .label {
            @include label_focus();
          }
        }
        @-webkit-keyframes background-color {
          0%,
          100% {
            color: #666;
            background: transparent;
          }
        }
      `}</style>
    </>
  );
}
