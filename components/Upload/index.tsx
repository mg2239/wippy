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
        <p className="hidden lg:inline">Drag and drop, or </p>{' '}
        <div {...getRootProps()} className="inline">
          <input {...getInputProps()} />
          <p className="inline cursor-pointer font-medium text-rose-500 hover:underline">
            {width < ScreenSizes.lg ? 'Click to upload' : 'click to upload'}
          </p>
        </div>
      </div>
      <p className="text-center text-sm font-light text-gray-400 md:text-base">
        mp3, wav, flac accepted; 20 MB max
      </p>
    </>
  );
};
