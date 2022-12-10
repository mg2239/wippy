import React, { useCallback } from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';

type UploadContextType = Pick<
  DropzoneState,
  'isDragActive' | 'getInputProps' | 'getRootProps'
>;

export const UploadContext = React.createContext<UploadContextType>({
  isDragActive: false,
  getInputProps: () => null as any,
  getRootProps: () => null as any,
});

export const UploadProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const onDrop = useCallback((file: File[]) => {
    console.log(file);
  }, []);

  const state = useDropzone({ onDrop });

  return (
    <UploadContext.Provider value={state}>{children}</UploadContext.Provider>
  );
};
