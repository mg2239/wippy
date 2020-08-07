import cn from 'classnames';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import { useTrack } from '../../index.state';
import styles from './index.module.scss';
import Button from 'src/components/Button/index';
import { Color, Time, toTime, toColor } from 'src/types';
import { timeToPlural } from 'src/util/time';

function Modal() {
  const [expireDuration, setExpireDuration] = useState<number>();
  const [expireUnit, setExpireUnit] = useState(Time.MINUTE);
  const { title, theme, setTitle, setTheme } = useTrack();

  const times = Object.values(Time).map((time) => (
    <option key={time} value={time}>
      {timeToPlural(time)}
    </option>
  ));
  const colors = Object.values(Color).map((color) => (
    <option key={color} value={color}>
      {color}
    </option>
  ));

  const validateAndSave = () => {
    console.log(title, expireDuration, expireUnit, theme);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>upload complete!</h2>
      <input
        className={cn(styles.input, styles.titleInput)}
        type="text"
        placeholder="add a title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.inputContainer}>
        <p className={styles.label}>expires:</p>
        <input
          type="number"
          className={cn(styles.input, styles.expireInput)}
          onChange={(e) => setExpireDuration(Number(e.target.value))}
        />
        <select
          className={styles.select}
          onChange={(e) => setExpireUnit(toTime(e.target.value))}
        >
          {times}
        </select>
      </div>
      <div className={styles.inputContainer}>
        <p className={styles.label}>theme:</p>
        <select
          className={styles.select}
          onChange={(e) => setTheme(toColor(e.target.value))}
        >
          {colors}
        </select>
      </div>
      <Button onClick={validateAndSave}>submit</Button>
    </div>
  );
}

export default function TrackEdit() {
  return (
    <>
      {createPortal(<div id="modal-bg" />, document.body)}
      <Modal />
    </>
  );
}
