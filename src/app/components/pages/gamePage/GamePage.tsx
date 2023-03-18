import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.css';
import Timer from '../../common/Timer';
import GameField from './GameField';

type GamePageParams = {
  id: string;
};

const GamePage: FC = () => {
  const { id } = useParams<GamePageParams>();
  const [win, setWin] = useState<boolean>(false);
  const [died, setDied] = useState(false);
  const changeWin = () => {
    setWin(true);
  };
  const changeDied = () => {
    setDied(true);
  };

  return (
    <div className={styles.wrapper}>
      <Timer time={10} win={win} died={died} />
      {id === '1' ? (
        <GameField sizeX={8} changeWin={changeWin} changeDied={changeDied} />
      ) : (
        <GameField sizeX={16} changeWin={changeWin} changeDied={changeDied} />
      )}
    </div>
  );
};

export default GamePage;
