import { useContext } from 'react';
import { UploadContext } from '../../context/UploadContext';
import { useUpload } from '../../hooks/useUpload';

export const Upload = () => {
  const { onUpload } = useContext(UploadContext);
  const { getRootProps, getInputProps } = useUpload({
    onDrop: onUpload,
    noDrag: true,
  });

  return (
    <div className="mb-2 text-xl">
      Drag and drop or{' '}
      <div
        {...getRootProps()}
        className="inline cursor-pointer font-medium text-rose-500 hover:underline"
      >
        <input {...getInputProps()} />
        click to upload
      </div>
    </div>
  );
};
