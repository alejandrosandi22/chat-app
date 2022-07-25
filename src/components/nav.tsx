export default function Nav() {
  return (
    <>
      <nav></nav>
      <style jsx>
        {`
          nav {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            background: var(--primary);
          }
        `}
      </style>
    </>
  );
}
