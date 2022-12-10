import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Head } from '../components/Head';
import { Page } from '../components/Page';
import { Upload } from '../components/Upload';
import { UploadProvider } from '../context/upload';

const LandingPage = () => {
  const [uploaded, setUploaded] = useState(false);
  const router = useRouter();

  const onUpload = () => setUploaded(true);

  const onSuccess = (id: string) => router.push(`/${id}`);

  return (
    <Page>
      <Head />
      <div className="flex flex-col items-center">
        <p className="mb-8 text-4xl font-medium">
          Upload and share tracks easily and securely.
        </p>
        <Upload />
        <p className="font-light text-gray-500">Max file size: 15MB</p>
      </div>
    </Page>
  );
};

export default LandingPage;
