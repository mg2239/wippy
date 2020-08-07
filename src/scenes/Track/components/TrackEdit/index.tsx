import React from 'react';

import styles from './index.module.scss';
import { Color, Time } from 'src/types';
import { timeToPlural } from 'src/util/time';

export default function TrackEdit() {
  const times = Object.values(Time).map((t) => timeToPlural(t));
  const colors = Object.values(Color);

  const createOptions = (options: string[]) =>
    options.map((o) => <option>{o}</option>);

  return (
    <div className={styles.container}>
      <h2>upload complete!</h2>
      <input type="text" placeholder="add a title" />
      <div>
        <p>expires:</p>
        <input type="text" />
        <select>{createOptions(times)}</select>
      </div>
      <div>
        <p>background color</p>
        <select>{createOptions(colors)}</select>
      </div>
    </div>
  );
}
