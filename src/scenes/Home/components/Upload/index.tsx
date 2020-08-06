import { Line } from 'rc-progress';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuid } from 'uuid';

import styles from './index.module.scss';
import { storage } from 'src/util/firebase';

function InfoText() {
  return (
    <div className={styles.textWrapper}>
      <p className={styles.mainText}>click to upload audio</p>
      <p className={styles.subText}>or drag and drop your file here</p>
      <p className={styles.fileLimits}>mp3 only, limit 15MB</p>
    </div>
  );
}

type UploadTextProps = {
  progress: number;
};

function UploadText({ progress }: UploadTextProps) {
  return (
    <div className={styles.textWrapper}>
      <p className={styles.mainText}>uploading...</p>
      <Line percent={progress} strokeWidth={4} strokeColor="#2A2C30" />
    </div>
  );
}

type UploadProps = {
  onUpload: () => void;
  onSuccess: (id: string) => void;
};

export default function Upload({ onUpload, onSuccess }: UploadProps) {
  const [accepted, setAccepted] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDropAccepted = (files: File[]) => {
    onUpload();
    setAccepted(true);

    const mp3 = files[0]; // only one file allowed
    const id = uuid();
    const uploadTask = storage.ref().child(`${id}.mp3`).put(mp3);

    const whileUpload = (snapshot: firebase.storage.UploadTaskSnapshot) => {
      const { bytesTransferred, totalBytes } = snapshot;
      const newProgress = Math.floor((bytesTransferred / totalBytes) * 100);
      setProgress(newProgress);
    };

    const onError = (err: Error) => console.log(err);

    const onComplete = () => onSuccess(id);

    uploadTask.on('state_changed', whileUpload, onError, onComplete);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    accept: '.mp3',
    maxSize: 15728640, // 15 MB
    multiple: false,
  });

  return (
    <>
      {!accepted && (
        <div
          {...getRootProps({
            className: styles.infoWrapper,
          })}
        >
          <input {...getInputProps()} />
          <InfoText />
        </div>
      )}
      {accepted && (
        <div className={styles.uploadWrapper}>
          <UploadText progress={progress} />
        </div>
      )}
    </>
  );
}
