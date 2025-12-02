import { Line } from 'rc-progress';
import { useContext } from 'react';
import { Head } from '../components/Head';
import { Page } from '../components/Page';
import { Upload } from '../components/Upload';
import { UploadForm } from '../components/UploadForm';
import { UploadContext } from '../context/UploadContext';

const LandingPage = () => {
  const { uploading, progress } = useContext(UploadContext);

  return (
    <Page>
      <Head />
      <div className="flex flex-col items-center">
        <p className="mb-8 text-4xl font-medium">
          Upload and share tracks easily and securely.
        </p>
        {!uploading ? (
          <div className="rounded-md border-2 border-dashed border-gray-400 p-10 transition-all">
            <Upload />
          </div>
        ) : (
          <div className="w-96 text-center">
            <p className="mt-2 mb-4 text-lg">Uploading...</p>
            <Line
              percent={progress}
              strokeWidth={1}
              trailWidth={1}
              strokeColor="#f43f5d"
            />
            <UploadForm />
          </div>
        )}
      </div>
    </Page>
  );
};

export default LandingPage;
