import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';

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
