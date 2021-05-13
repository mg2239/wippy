import React from 'react';

import styles from './button.module.scss';

type ButtonProps = {
  children: string | JSX.Element;
  onClick: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
