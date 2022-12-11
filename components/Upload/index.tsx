import { useContext } from 'react';
import { UploadContext } from '../../context/UploadContext';
import { ScreenSizes, useScreenWidth } from '../../hooks/useScreenWidth';
import { useUpload } from '../../hooks/useUpload';

export const Upload = () => {
  const { onUpload } = useContext(UploadContext);
  const { getRootProps, getInputProps } = useUpload({
    onDrop: onUpload,
    noDrag: true,
  });
  const width = useScreenWidth();

  return (
    <>
      <div className="mb-2 text-center text-xl">
        <div className="hidden lg:inline">Drag and drop, or </div>{' '}
        <div
          {...getRootProps()}
          className="inline cursor-pointer font-medium text-rose-500 hover:underline"
        >
          <input {...getInputProps()} />
          {width < ScreenSizes.lg ? 'Click to upload' : 'click to upload'}
        </div>
      </div>
      <p className="text-center text-sm font-light text-gray-500 md:text-base">
        mp3, wav, flac accepted; 20 MB max
      </p>
    </>
  );
};
