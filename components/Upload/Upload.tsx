import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './upload.module.scss';


type Props = {
  onUpload: () => void
}

function InfoText() {
  return (
    <div id={styles.textContainer}>
      <p id={styles.main}>click to upload audio</p>
      <p id={styles.subtext}>or drag and drop your file here</p>
      <p id={styles.files}>mp3, wav, and flac ok</p>
    </div>
  );
}

function UploadText() {
  return (
    <div id={styles.textContainer}>
      <p id={styles.main}>uploading...</p>
    </div>
  );
}

export default function Upload({ onUpload }: Props) {
  const [accepted, setAccepted] = useState(false);
  function onDropAccepted(files: any[]) {
    onUpload();
    setAccepted(true);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const fileBinary = reader.result;
        const storageRef = 
      };
      reader.readAsArrayBuffer(file);
    });
  }
  function onDropRejected() {
    console.log('incorrect');
  }
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: ['.mp3', '.wav', '.flac', '.ogg'],
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
          <UploadText />
        </div>
      )}
    </>
  );
}
