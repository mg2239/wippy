import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import spacetime from 'spacetime';
import { db, storage } from '../util/firebase';

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

  useEffect(() => {
    return () => setUploading(false);
  }, []);

  const onUpload = (file: File[]) => {
    const [audio] = file;
    const id = nanoid();
    const sepIndex = audio.name.lastIndexOf('.');
    const title = audio.name.slice(0, sepIndex);
    const ext = audio.name.slice(sepIndex + 1);
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
        setProgress(progress);
      },
      // error
      console.log,
      // complete
      () => {
        const now = spacetime.now();
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            return setDoc(doc(db, 'tracks', id), {
              title,
              createdAt: now.toNativeDate(),
              expiresAt: now.add(10, 'minutes').toNativeDate(),
              url: downloadURL,
            });
          })
          .then(() => {
            const pathname = `/${id}`;
            router.push({ pathname, query: { uploaded: true } }, pathname);
          });
      }
    );
  };

  return (
    <UploadContext.Provider value={{ uploading, progress, file, onUpload }}>
      {children}
    </UploadContext.Provider>
  );
};
