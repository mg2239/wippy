import React from 'react';
import Link from 'next/link';
import short from 'short-uuid';
import Nav from '../components/Header/Header';
import Upload from '../components/Upload/Upload';

const uuid = short();

const IndexPage = () => {
  const id = uuid.new();
  return (
    <>
      <Nav />
      <p>visit a random page lol</p>
      <Link href={`/track/${id}`}>
        <a>{id}</a>
      </Link>
      <Upload />
    </>
  );
};

export default IndexPage;
