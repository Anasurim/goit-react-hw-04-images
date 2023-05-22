import React from 'react';
import css from '../Button/Button.module.css';

export function Button({ onClick }) {
  return (
    <div className={css.wrapper}>
      <button type="button" onClick={onClick} className={css.Button}>
        Load more
      </button>
    </div>
  );
}
