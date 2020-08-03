import React from 'react';

import styles from './index.module.scss';

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
  children: JSX.Element;
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
