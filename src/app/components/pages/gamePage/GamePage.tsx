import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import Timer from '../../common/Timer';
import GameField from './GameField';
import styles from './index.module.css';

type GamePageParams = {
  id: string;
};

const GamePage: FC = () => {
  const { id } = useParams<GamePageParams>();
  const [win, setWin] = useState<boolean>(false);
  const [died, setDied] = useState(false);
  const [time, setTime] = useState<number>(0);
  const [lose, setLose] = useState<boolean>(false);
  const size = id === '1' ? 8 : id === '2' ? 16 : 32;
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
      <GameField
        size={size}
        changeWin={changeWin}
        changeDied={changeDied}
        time={time}
        lose={lose}
      />
    </div>
  );
};

export default GamePage;
