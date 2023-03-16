import React, { FC } from 'react';
import styles from './index.module.css';
import Timer from '../../common/Timer';
import GameField from './GameField';

const GamePage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Timer time={10} />
      <GameField size={10} />
    </div>
  );
};

export default GamePage;
