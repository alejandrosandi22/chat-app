import React, { useState } from 'react';

interface ToggleContactProfileType {
  toggle: boolean;
  handleToggle: () => void;
}

const INITIAL_VALUE: ToggleContactProfileType = {
  toggle: false,
  handleToggle: () => {},
};

export const ToggleContactProfileContext =
  React.createContext<ToggleContactProfileType>(INITIAL_VALUE);

export const ToggleContactProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => setToggle(!toggle);

  return (
    <ToggleContactProfileContext.Provider value={{ toggle, handleToggle }}>
      {children}
    </ToggleContactProfileContext.Provider>
  );
};
