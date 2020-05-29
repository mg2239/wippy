import React from 'react';
import styles from './landingtext.module.scss';

function LandingText() {
  return (
    <div id={styles.textWrapper}>
      <p id={styles.main}>
        keep your unreleased and unfinished songs <b>safe</b>
      </p>
      <p id={styles.subtext}>
        <b>upload</b> and <b>share</b> audio quickly and securely with expiring links
      </p>
    </div>
  );
}

export default LandingText;
