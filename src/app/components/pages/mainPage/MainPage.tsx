import React, { FC } from 'react';
import ButtonMainPage from '../../common/ButtonMainPage';
import { array } from './array';
import styles from './index.module.css';

const MainPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainTitle}>Добро пожаловать наш пользователь</h1>
      <h2 className={styles.h2Title}>
        Это игра Сапёр и ты можешь выбрать одну из 3-х сложностей
      </h2>
      <div className={styles.buttonsMainPage}>
        {array.map(item => {
          return <ButtonMainPage title={item.titile} id={item.id} key={item.id} />;
        })}
      </div>
      <ButtonMainPage title="Таблица лидеров" id="table" />
    </div>
  );
};

export default MainPage;
