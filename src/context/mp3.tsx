import React, { useContext, useState, createContext } from 'react';

type MP3State = {
  isNew: boolean;
  mp3?: File;
  setIsNew: (isNew: boolean) => void;
  setMP3: (mp3: File) => void;
};

const initialState: MP3State = {
  isNew: false,
  setIsNew: () => {},
  setMP3: () => {},
};

const MP3Context = createContext(initialState);

export function useMP3() {
  return useContext(MP3Context);
}

type ProviderProps = {
  children: JSX.Element;
};

export function MP3Provider({ children }: ProviderProps) {
  const [mp3, setMP3] = useState(initialState.mp3);
  const [isNew, setIsNew] = useState(initialState.isNew);
  return (
    <MP3Context.Provider value={{ isNew, setIsNew, mp3, setMP3 }}>
      {children}
    </MP3Context.Provider>
  );
}
