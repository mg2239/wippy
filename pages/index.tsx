import React from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import Page from '../components/Page/Page';
import Upload from '../components/Upload/Upload';

export default function Home() {
  const id = uuidv4();
  return (
    <Page>
      <div className='container'>
        <Link href={`/${id}`}>
          <a>{id}</a>
        </Link>
        <Upload />
      </div>
    </Page>
  );
}
