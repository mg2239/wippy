import React from 'react';
import styles from './footer.module.css';
import github from '../../public/svg/github-brands.svg';
import soundcloud from '../../public/svg/soundcloud-brands.svg';

export default function Footer() {
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
