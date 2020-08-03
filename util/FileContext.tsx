import React, { useContext, useState } from 'react';

type FileState = {
  mp3?: File;
  setMp3: (mp3: File) => void;
};

const initialState: FileState = { setMp3: () => {} };

const FileContext = React.createContext(initialState);

export function useFile() {
  return useContext(FileContext);
}

export function FileProvider({ children }: { children: JSX.Element }) {
  const [mp3, setMp3] = useState((undefined as unknown) as File);
  console.log(mp3);
  return (
    <FileContext.Provider value={{ mp3, setMp3 }}>
      {children}
    </FileContext.Provider>
  );
}
