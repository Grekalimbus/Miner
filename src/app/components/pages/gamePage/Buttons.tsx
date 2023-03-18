import React, { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';

const Buttons: FC = () => {
  const history = useHistory();
  return (
    <div className={styles.wrapperButton}>
      <button
        className={styles.button}
        onClick={() => {
          window.location.reload();
        }}
      >
        Перезапуск игры
      </button>
      <button
        className={styles.button}
        onClick={() => {
          history.push('/');
        }}
      >
        Экран настроек
      </button>
    </div>
  );
};

export default Buttons;
