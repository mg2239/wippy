import React from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './upload.module.css';

type Props = {
  onUpload: () => number
}

function UploadText() {
  return (
    <div id={styles.uploadText}>
      <p id={styles.main}>click to upload audio</p>
      <p id={styles.subtext}>or drag and drop your file here</p>
      <p id={styles.files}>mp3, wav, and flac ok</p>
    </div>
  );
}

export default function Upload({ onUpload }: Props) {
  function onDropAccepted(acceptedFiles: any) {
    onUpload();
    console.log(acceptedFiles);
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
    <div {...getRootProps({
      id: styles.uploadContainer,
    })}>
      <input {...getInputProps()} />
      <UploadText />
    </div>
  );
}
