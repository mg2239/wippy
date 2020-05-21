import React from 'react';
import github from './github.svg';
import soundcloud from './soundcloud.svg';
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
    <div id={styles.footerContainer}>
      <p>created by matt (polarr)</p>
      <div id={styles.footerIcons}>
        <img src={github} className={styles.icon} />
        <img src={soundcloud} className={styles.icon} />
      </div>
    </div>
  );
}

export default function Page({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
