import cn from 'classnames';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import { useTrack } from '../../track.state';
import { timeToPlural } from '../../track.util';
import styles from './trackedit.module.scss';
import Button from 'src/components/Button/index';
import { useMP3 } from 'src/context/mp3';
import { Color, Time } from 'src/types';

function Modal() {
  const [expireDuration, setExpireDuration] = useState(1);
  const [expireUnit, setExpireUnit] = useState<Time>('minute');
  const { setTitle, setTheme, saveInfo } = useTrack();
  const { setIsNew } = useMP3();

  const times = (['minute', 'hour', 'day'] as Time[]).map((time) => (
    <option key={time} value={time.toString()}>
      {timeToPlural(time)}
    </option>
  ));
  const colors = ([
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'pink',
    'gray',
    'black',
  ] as Color[]).map((color) => (
    <option key={color} value={color.toString()}>
      {color}
    </option>
  ));

  const validateAndSave = () => {
    if (expireDuration > 0) {
      saveInfo(expireDuration, expireUnit);
      setIsNew(false);
    }
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
          min="1"
          className={cn(styles.input, styles.expireInput)}
          onChange={(e) => setExpireDuration(Number(e.target.value))}
        />
        <select
          className={styles.select}
          onChange={(e) => setExpireUnit(e.target.value as Time)}
        >
          {times}
        </select>
      </div>
      <div className={styles.inputContainer}>
        <p className={styles.label}>theme:</p>
        <select
          className={styles.select}
          onChange={(e) => setTheme(e.target.value as Color)}
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
