import React, { useContext, useState } from 'react';

type FileState = {
  mp3?: File
  setMp3: (mp3: File) => void
};

const initialState: FileState = {
  mp3: undefined,
  setMp3: () => { },
};

const FileContext = React.createContext(initialState);

export function useFile() {
  return useContext(FileContext);
}

export default FileContext;

// type Props = {
//   children: JSX.Element
// }

// export function FileProvider({ children }: Props) {
//   const [mp3, setMP3] = useState(undefined as unknown as File);
//   return (
//     <FileContext.Provider value={{ mp3, setMP3 }}>{children}</FileContext.Provider>
//   );
// }
