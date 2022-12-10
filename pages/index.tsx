import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { PlusIcon } from '@heroicons/react/20/solid';
import { Head } from '../components/Head';
import { Page } from '../components/Page';

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
        <button className="mb-2 flex items-center rounded-lg bg-black px-4 py-2 text-white transition-colors hover:bg-gray-700">
          <PlusIcon className="mr-1 h-6 w-6" />
          <p className="mr-1">Upload file</p>
        </button>
        <p className="font-light text-gray-500">Max file size: 15MB</p>
      </div>
    </Page>
  );
};

export default LandingPage;
