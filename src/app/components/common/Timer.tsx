import React, { FC, useState, useEffect } from 'react';
import styles from './index.module.css';

interface Props {
  time: number;
  win: boolean;
  died: boolean;
}

const Timer: FC<Props> = ({ time, win, died }) => {
  const [seconds, setSeconds] = useState<number>(time * 60);

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      if (!win && !died) {
        setSeconds((prevSeconds: number) => prevSeconds - 1);
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
