import React, { useContext, useState, createContext } from 'react';

type UploadState = {
  isNew: boolean;
  mp3?: File;
  setIsNew: (isNew: boolean) => void;
  setMp3: (mp3: File) => void;
};

const initialState: UploadState = {
  isNew: false,
  setIsNew: () => {},
  setMp3: () => {},
};

const UploadContext = createContext(initialState);

export function useUpload() {
  return useContext(UploadContext);
}

type ProviderProps = {
  children: JSX.Element;
};

export function UploadProvider({ children }: ProviderProps) {
  const [mp3, setMp3] = useState<File>(undefined as any);
  const [isNew, setIsNew] = useState(false);
  return (
    <UploadContext.Provider value={{ isNew, setIsNew, mp3, setMp3 }}>
      {children}
    </UploadContext.Provider>
  );
}
