import React from 'react';
import Head from 'next/head';
import Page from '../components/Page/Page';
import HomePageContent from '../components/HomePageContent/HomePageContent';

export default function Home() {
  return (
    <>
      <Head>
        <title>home - wippy</title>
      </Head>
      <Page>
        <HomePageContent />
      </Page>
    </>
  );
}
