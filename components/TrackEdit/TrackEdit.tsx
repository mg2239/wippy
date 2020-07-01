import React, { useState } from 'react';
import styles from './trackedit.module.scss';

// enum ExpireTypes {
//   M = 'minutes',
//   H = 'hours',
// }

type Props = {
  onTitleChange: (title: string) => void
  onDescChange: (desc: string) => void
  onExpTypeChange: (type: string) => void
  onExpValChange: (value: number) => void
  onColorChange: (color: string) => void
  onSubmit: (
    title: string,
    desc: string,
    expireType: string,
    expireValue: number,
    color: string,
  ) => void
}

function TrackEdit(
  { onTitleChange, onDescChange, onExpTypeChange, onExpValChange, onColorChange, onSubmit }: Props,
) {
  const validateInfo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={validateInfo}>
        <input
          type='text'
          name='title'
          id={styles.title}
          placeholder='enter a title'
          onChange={(e) => onTitleChange(e.target.value)}
        />
        <textarea
          name='desc'
          id={styles.desc}
          placeholder='enter a description'
          onChange={(e) => onDescChange(e.target.value)}
        />
      </form>
    </div>
  );
}

export default TrackEdit;
