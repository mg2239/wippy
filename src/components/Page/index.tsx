import React from 'react';

import styles from './index.module.scss';
import Head from 'src/components/Head';

function Header() {
  return (
    <div id={styles.headerWrapper}>
      <a href="/" id={styles.header}>
        wippy
      </a>
    </div>
  );
}

function Footer() {
  return <div id={styles.footerWrapper} />;
}

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function Page({ children }: Props) {
  return (
    <>
      <Head />
      <Header />
      {children}
      <Footer />
    </>
  );
}
