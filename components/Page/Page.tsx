import React from 'react';
import github from './github.svg';
import soundcloud from './soundcloud.svg';
import styles from './page.module.css';

type Props = {
  children: JSX.Element
};

function Header() {
  return (
    <div id={styles.headerContainer}>
      <h1 id={styles.header}>wippy</h1>
    </div>
  );
}

function Footer() {
  return (
    <div>
      <p>created by matt (polarr)</p>
      <div>
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
