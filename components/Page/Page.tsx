import React from 'react';
import styles from './page.module.scss';

type Props = {
  children: JSX.Element
};

function Header() {
  return (
    <div id={styles.headerContainer}>
      <a href='/' id={styles.header}>wippy</a>
    </div>
  );
}

function Footer() {
  return (
    <div id={styles.footerContainer} />
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
