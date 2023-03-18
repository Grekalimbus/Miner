import React, { FC } from 'react';
import ButtonMainPage from '../../common/ButtonMainPage';
import styles from './index.module.css';

const MainPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainTitle}>Добро пожаловать наш пользователь</h1>
      <h2 className={styles.h2Title}>
        Это игра Сапёр и ты можешь выбрать одну из 3-х сложностей
      </h2>
      <div className={styles.buttonsMainPage}>
        <ButtonMainPage title="Простой 8x8, 10 мин" id="1" />
        <ButtonMainPage title="Средний 16x16, 40 мин" id="2" />
        <ButtonMainPage title="Сложный 32x16, 100 мин" id="3" />
      </div>
      <ButtonMainPage title="Таблица лидеров" id="table" />
    </div>
  );
};

export default MainPage;
