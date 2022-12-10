import { DropzoneOptions, useDropzone } from 'react-dropzone';

export const useUpload = (options: DropzoneOptions) => {
  const state = useDropzone({
    maxFiles: 1,
    maxSize: 20_000_000, // 20 MB
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac'],
    },
    ...options,
  });

  return state;
};
