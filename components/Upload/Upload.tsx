import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Line } from 'rc-progress';
import firebase from '../../utils/initFirebase';
import 'firebase/storage';
import styles from './upload.module.scss';

const storage = firebase.storage();

function InfoText() {
  return (
    <div id={styles.textContainer}>
      <p id={styles.main}>click to upload audio</p>
      <p id={styles.subtext}>or drag and drop your file here</p>
      <p id={styles.files}>mp3 only</p>
    </div>
  );
}

type UploadProps = {
  progress: number
}

function UploadText({ progress }: UploadProps) {
  return (
    <div id={styles.textContainer}>
      <p id={styles.main}>uploading...</p>
      <Line percent={progress} strokeWidth={4} strokeColor='#2A2C30' />
    </div>
  );
}

type Props = {
  onUpload: () => void
  onSuccess: (filename: string) => void
}

export default function Upload({ onUpload, onSuccess }: Props) {
  const [accepted, setAccepted] = useState(false);
  const [progress, setProgress] = useState(0);
  function onDropAccepted(files: File[]) {
    onUpload();
    setAccepted(true);
    const file = files[0]; // only one file allowed
    const uploadTask = storage.ref().child(file.name).put(file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const newProgress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(newProgress);
      },
      (err) => console.log(err),
      () => onSuccess(file.name));
  }
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    accept: '.mp3',
    multiple: false,
  });
  return (
    <>
      {!accepted && (
        <div {...getRootProps({
          id: styles.infoContainer,
        })}>
          <input {...getInputProps()} />
          <InfoText />
        </div >
      )}
      {accepted && (
        <div id={styles.uploadContainer}>
          <UploadText progress={progress} />
        </div>
      )}
    </>
  );
}
