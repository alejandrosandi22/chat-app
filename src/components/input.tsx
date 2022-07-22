export default function Input({
  id,
  type,
  name,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        <label className='label' htmlFor={id}>
          {placeholder}
        </label>
      </div>
      <style jsx>{`
        $value: false;
        @mixin label_focus($value) {
          border-radius: 20px;
          top: 15%;
          font-size: 12px;
          background: var(--primary);
          border: 1px solid var(--primary-font-color);
          @if $value == true {
            border: 1px solid var(--secondary-font-color);
            color: var(--secondary-font-color);
          }
          @else {
            color: var(--primary-font-color);
          }
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
            @include label_focus($value);
            color: var(--secondary-font-color);
            border: 1px solid var(--secondary-font-color);
          }
          .input {
            width: 100%;
            height: 40px;
            font-size: 15px;
            padding: 5px 10px 0 10px;
            color: var(--primary-font-color);
            border: none;
            outline: none;
            background: transparent;
            border: 1px solid var(--secondary-font-color);
            transition: 0.25s;
            &:not([value=''])  {
              color: var(--secondary-font-color);
            }
            &:focus,
            &:active,
            &:focus-within {
              color: var(--primary-font-color);
              border: 1px solid var(--primary-font-color);
            }
            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus,
            &:-webkit-autofill:active {
              transition-delay: 9999s;
              transition-property: background-color, color;
            }
            &:not([value='']) ~ .label {
              @include label_focus($value: true);
            }
            &:focus ~ .label {
              @include label_focus($value);
            }
            &:not([value='']) and &:focus ~ .label {
              @include label_focus($value);
            }
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
