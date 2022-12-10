import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../util/firebase';

type UploadContextType = {
  uploading: boolean;
  onUpload: (file: File[]) => void;
};

export const UploadContext = React.createContext<UploadContextType>({
  uploading: false,
  onUpload: () => null,
});

export const UploadProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [uploading, setUploading] = useState(false);

  const onUpload = (file: File[]) => {
    setUploading(true);

    const [audio] = file;
    const id = nanoid();

    const [_, ext] = audio.name.split('.');

    const audioRef = ref(storage, `${id}.${ext}`);

    const uploadTask = uploadBytesResumable(audioRef, audio);

    uploadTask.on(
      'state_changed',
      // uploading
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      // error
      console.log,
      // complete
      () => {
        console.log('success');
      }
    );
  };

  return (
    <UploadContext.Provider value={{ uploading, onUpload }}>
      {children}
    </UploadContext.Provider>
  );
};
