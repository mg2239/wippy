import React from 'react';
import styles from './index.module.scss';

type Props = {
  children: JSX.Element
};

function Header() {
  return (
    <div id={styles.headerWrapper}>
      <a href='/' id={styles.header}>wippy</a>
    </div>
  );
}

function Footer() {
  return (
    <div id={styles.footerWrapper} />
  );
}

function Page({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Page;
