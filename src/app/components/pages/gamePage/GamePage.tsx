import React, { FC, useEffect, useState, useCallback } from 'react';
import styles from './index.module.css';
import Timer from '../../common/Timer';
import GameField from './GameField';

const GamePage: FC = () => {
  const [win, setWin] = useState<boolean>(false);
  useEffect(() => {
    console.log(win);
  }, [win]);
  const changeWin = () => {
    setWin(true);
  };

  return (
    <div className={styles.wrapper}>
      <Timer time={10} win={win} />
      <GameField sizeX={16} changeWin={changeWin} />
    </div>
  );
};

export default GamePage;
