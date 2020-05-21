import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

type Props = {
  children: JSX.Element
};

export default function Page({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
