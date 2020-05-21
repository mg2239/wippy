import React from 'react';
import styles from './header.module.css';

export default function Header() {
  return (
    <div id={styles.headerContainer}>
      <h1 id={styles.header}>wippy</h1>
    </div>
  );
}
