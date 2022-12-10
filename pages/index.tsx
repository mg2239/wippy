import { Head } from '../components/Head';
import { Page } from '../components/Page';
import { Upload } from '../components/Upload';
import { UploadProvider } from '../context/UploadContext';

const LandingPage = () => {
  return (
    <UploadProvider>
      <Page>
        <Head />
        <div className="flex flex-col items-center">
          <p className="mb-8 text-4xl font-medium">
            Upload and share tracks easily and securely.
          </p>
          <Upload />
          <p className="font-light text-gray-500">
            mp3, wav, flac accepted; 20 MB max
          </p>
        </div>
      </Page>
    </UploadProvider>
  );
};

export default LandingPage;
