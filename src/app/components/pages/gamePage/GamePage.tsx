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
  const [time, setTime] = useState<number>(0);
  const [lose, setLose] = useState<boolean>(false);
  const changeWin = () => {
    setWin(true);
  };
  const changeDied = () => {
    setDied(true);
  };
  const changeTime = (time: number) => {
    setTime(time);
  };
  const changeLose = () => {
    setLose(true);
  };

  return (
    <div className={styles.wrapper}>
      <Timer
        win={win}
        died={died}
        id={id}
        changeTime={changeTime}
        changeLose={changeLose}
      />
      {id === '1' ? (
        <GameField
          size={2}
          changeWin={changeWin}
          changeDied={changeDied}
          time={time}
          lose={lose}
        />
      ) : id === '2' ? (
        <GameField
          size={16}
          changeWin={changeWin}
          changeDied={changeDied}
          time={time}
          lose={lose}
        />
      ) : (
        <GameField
          size={32}
          changeWin={changeWin}
          changeDied={changeDied}
          time={time}
          lose={lose}
        />
      )}
    </div>
  );
};

export default GamePage;
