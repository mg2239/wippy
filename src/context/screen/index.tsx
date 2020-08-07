import React, { useContext, useState, useEffect, createContext } from 'react';

type Breakpoint = 'D' | 'T' | 'M';

type ScreenState = {
  breakpoint: Breakpoint;
  isWindow: (width: Breakpoint) => boolean;
};

const initialState: ScreenState = {
  breakpoint: 'D',
  isWindow: () => false,
};

const ScreenContext = createContext(initialState);

export function useScreen() {
  return useContext(ScreenContext);
}

type ProviderProps = {
  children: JSX.Element;
};

export function ScreenProvider({ children }: ProviderProps) {
  const [breakpoint, setBreakpoint] = useState(initialState.breakpoint);

  const isWindow = (width: Breakpoint) => breakpoint === width;

  const onWindowResize = () => {
    const { innerWidth } = window;
    if (innerWidth > 1025) setBreakpoint('D');
    else if (innerWidth <= 1024 && innerWidth > 768) setBreakpoint('T');
    else setBreakpoint('M');
  };

  useEffect(() => {
    onWindowResize(); // Set the initial values.
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  return (
    <ScreenContext.Provider value={{ breakpoint, isWindow }}>
      {children}
    </ScreenContext.Provider>
  );
}
