import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import spacetime from 'spacetime';
import { UploadInfo } from '../types';
import { getFileParts } from '../util';
import { db, storage } from '../util/firebase';

type UploadContextType = {
  uploading: boolean;
  progress: number;
  file?: File;
  setSaved: (value: boolean) => void;
  onSave: (info: UploadInfo) => void;
  onUpload: (file: File[]) => void;
};

export const UploadContext = React.createContext<UploadContextType>({
  uploading: false,
  progress: 0,
  setSaved: () => null,
  onSave: () => null,
  onUpload: () => null,
});

export const UploadProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File>();
  const [id, setId] = useState<string>();
  const [saved, setSaved] = useState(false);
  const [info, setInfo] = useState<UploadInfo>();
  const [downloadUrl, setDownloadUrl] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    if (saved && downloadUrl) {
      const now = spacetime.now();
      const {
        title,
        expiration: { amount, unit },
      } = info!;
      setDoc(doc(db, 'tracks', id!), {
        title,
        createdAt: now.toNativeDate(),
        expiresAt: now.add(amount, unit).toNativeDate(),
        url: downloadUrl,
      }).then(() => {
        router.push(`/${id}`);
        // Reset state after redirect
        setUploading(false);
        setProgress(0);
        setFile(undefined);
        setId(undefined);
        setSaved(false);
        setInfo(undefined);
        setDownloadUrl(undefined);
      });
    }
  }, [saved, downloadUrl]);

  const onSave = (_info: UploadInfo) => {
    setSaved(true);
    setInfo(_info);
  };

  const onUpload = (file: File[]) => {
    const [audio] = file;
    const id = nanoid();
    const { fileType } = getFileParts(audio);
    const audioRef = ref(storage, `${id}.${fileType}`);

    setUploading(true);
    setId(id);
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
        getDownloadURL(uploadTask.snapshot.ref).then(setDownloadUrl);
      }
    );
  };

  return (
    <UploadContext.Provider
      value={{ uploading, progress, file, setSaved, onUpload, onSave }}
    >
      {children}
    </UploadContext.Provider>
  );
};
