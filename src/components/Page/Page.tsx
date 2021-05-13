import React from 'react';

import styles from './page.module.scss';

function Header() {
  return (
    <div className={styles.headerContainer}>
      <a href="/" className={styles.header}>
        wippy
      </a>
    </div>
  );
}

function Footer() {
  return <div className={styles.footerContainer} />;
}

type Props = {
  children: JSX.Element | JSX.Element[];
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
