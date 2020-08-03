import React, { useContext, useState, useEffect } from 'react';

type Breakpoint = 'D' | 'T' | 'M';

type ScreenState = {
  breakpoint: Breakpoint;
};

const initialState: ScreenState = { breakpoint: 'D' };

const ScreenContext = React.createContext(initialState);

export function useScreen() {
  return useContext(ScreenContext);
}

export const ScreenProvider = ({ children }: { children: JSX.Element }) => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('D');

  const onWindowResize = () => {
    const { innerWidth } = window;

    if (innerWidth > 1025) setBreakpoint('D');
    else if (innerWidth <= 1024 && innerWidth >= 576) setBreakpoint('T');
    else setBreakpoint('M');
  };

  useEffect(() => {
    onWindowResize(); // Set the initial values.
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  return (
    <ScreenContext.Provider value={{ breakpoint }}>
      {children}
    </ScreenContext.Provider>
  );
};
