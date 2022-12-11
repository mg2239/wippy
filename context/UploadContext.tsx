import { ref, uploadBytesResumable } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { storage } from '../util/firebase';

type UploadContextType = {
  uploading: boolean;
  progress: number;
  file?: File;
  onUpload: (file: File[]) => void;
};

export const UploadContext = React.createContext<UploadContextType>({
  uploading: false,
  progress: 0,
  onUpload: () => null,
});

export const UploadProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File>();
  const router = useRouter();

  const onUpload = (file: File[]) => {
    const [audio] = file;
    const id = nanoid();
    const [_, ext] = audio.name.split('.');
    const audioRef = ref(storage, `${id}.${ext}`);

    setUploading(true);
    setProgress(0);
    setFile(audio);

    const uploadTask = uploadBytesResumable(audioRef, audio);

    uploadTask.on(
      'state_changed',
      // uploading
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        setProgress(progress);
      },
      // error
      console.log,
      // complete
      () => {
        const pathname = `/${id}`;
        router.push({ pathname, query: { uploaded: true } }, pathname);
        setUploading(false);
      }
    );
  };

  return (
    <UploadContext.Provider value={{ uploading, progress, file, onUpload }}>
      {children}
    </UploadContext.Provider>
  );
};
