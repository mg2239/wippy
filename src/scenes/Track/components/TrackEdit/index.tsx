import React from 'react';

import { Color, Time } from 'src/types';

export default function TrackEdit() {
  const times = Object.values(Time);
  const colors = Object.values(Color);

  const createOptions = (options: string[]) =>
    options.map((o) => <option>{o}</option>);

  return (
    <div>
      <h2>upload complete!</h2>
      <input placeholder="add a title" />
      <div>
        <p>expires:</p>
        <input placeholder="60" />
        <select>{createOptions(times)}</select>
      </div>
      <div>
        <p>background color</p>
        <select>{createOptions(colors)}</select>
      </div>
    </div>
  );
}
