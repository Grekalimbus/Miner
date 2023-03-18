import React, { FC, useState, useEffect } from 'react';
import styles from './index.module.css';

interface Props {
  win: boolean;
  died: boolean;
  id: string;
  changeTime: (time: number) => void;
}

const Timer: FC<Props> = ({ win, died, id, changeTime }) => {
  const [seconds, setSeconds] = useState<number>(
    id === '1' ? 10 * 60 : id === '2' ? 40 * 60 : 100 * 60
  );

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      if (!win && !died) {
        setSeconds((prevSeconds: number) => prevSeconds - 1);
      }
      if (win) {
        changeTime(seconds);
      }
    }, 1000);
    if (seconds === 0) {
      clearInterval(interval);
    }

    return (): void => clearInterval(interval);
  }, [win, died, seconds]);

  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;

  return (
    <div className={styles.timer}>
      {minutes}:{remainingSeconds < 10 ? '0' : ''}
      {remainingSeconds}
    </div>
  );
};

export default Timer;
