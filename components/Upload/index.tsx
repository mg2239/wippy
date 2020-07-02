/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Line } from 'rc-progress';
import { v4 as uuid } from 'uuid';
import { storage } from '../../utils/initFirebase';
import styles from './index.module.scss';

function InfoText() {
  return (
    <div id={styles.textWrapper}>
      <p id={styles.main}>click to upload audio</p>
      <p id={styles.subtext}>or drag and drop your file here</p>
      <p id={styles.fileLimits}>mp3 only, limit 15MB</p>
    </div>
  );
}

type UploadProps = {
  progress: number;
};

function UploadText({ progress }: UploadProps) {
  return (
    <div id={styles.textWrapper}>
      <p id={styles.main}>uploading...</p>
      <Line percent={progress} strokeWidth={4} strokeColor="#2A2C30" />
    </div>
  );
}

type Props = {
  onUpload: () => void;
  onSuccess: (mp3: File, id: string) => void;
};

export default function Upload({ onUpload, onSuccess }: Props) {
  const [accepted, setAccepted] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDropAccepted = (files: File[]) => {
    onUpload();
    setAccepted(true);

    const mp3 = files[0]; // only one file allowed
    const id = uuid();
    const uploadTask = storage.ref().child(`${id}.mp3`).put(mp3);

    const whileUpload = (snapshot: firebase.storage.UploadTaskSnapshot) => {
      const newProgress = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      );
      setProgress(newProgress);
    };

    const onError = (err: Error) => console.log(err);

    const onComplete = () => onSuccess(mp3, id);

    uploadTask.on('state_changed', whileUpload, onError, onComplete);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    accept: '.mp3',
    maxSize: 15728640,
    multiple: false,
  });

  return (
    <>
      {!accepted && (
        <div
          {...getRootProps({
            id: styles.infoWrapper,
          })}
        >
          <input {...getInputProps()} />
          <InfoText />
        </div>
      )}
      {accepted && (
        <div id={styles.uploadWrapper}>
          <UploadText progress={progress} />
        </div>
      )}
    </>
  );
}
