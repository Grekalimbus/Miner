import React, { FC, useEffect, useState } from 'react';
import { Mask } from 'src/app/utils/gameField';
import { createField } from 'src/app/utils/createField';
import styles from './index.module.css';
import Cell from './Cell';
import Buttons from './Buttons';
import { createBigField } from 'src/app/utils/createBigField';
import { createVeryBigField } from 'src/app/utils/createVeryBigField';
import { chekedWin } from 'src/app/utils/checkWin';
import { formatTimeElapsed } from 'src/app/utils/resultTime';

interface Props {
  size: number;
  changeWin: () => void;
  changeDied: () => void;
  time: number;
}

interface DataUser {
  [key: string]: {
    nik: string;
    lvl: string;
    time: string;
  };
}

const Mine = -1;

const GameField: FC<Props> = ({ size, changeWin, changeDied, time }) => {
  const callCreateField = sizeField();
  const createMask = new Array(size * size).fill(Mask.Fill);
  const dimension = new Array(size).fill(0);
  const [field, setField] = useState<number[]>(callCreateField);
  const [mask, setMask] = useState<Mask[]>(createMask);
  const [died, setDied] = useState<boolean>(false);

  function sizeField(): number[] {
    if (size < 9) {
      return createField(size, Mine);
    }
    if (size < 17) {
      return createBigField(size, Mine);
    }
    return createVeryBigField(size, Mine);
  }

  useEffect(() => {
    if (chekedWin(field, mask, Mine)) {
      changeWin();
      // setTimeout(() => {
      //   createDataLS();
      // }, 500);
      const firstTime = size < 9 ? 10 * 60 : size < 17 ? 40 * 60 : 100 * 60;
      if (time) {
        createDataLS(firstTime);
      }
    }
    if (died) {
      changeDied();
    }
  }, [chekedWin(field, mask, Mine), died, time]);

  console.log(field);

  function createDataLS(firstTime: number) {
    const nikName: string | null = prompt(
      'Ты выиграл! Введи твой ник, чтобы записать тебя в таблицу'
    );
    const lvl: string =
      size < 9 ? 'Простой (8х8)' : size < 17 ? 'Средний (16х16)' : 'Сложный (32х32)';
    if (nikName) {
      const data: DataUser = {
        [nikName]: { nik: nikName, lvl: lvl, time: formatTimeElapsed(firstTime, time) },
      };
      console.log(data);
    }
  }

  return (
    <div className={styles.wrapperGame}>
      {dimension.map((_, y) => (
        <div
          key={y}
          style={{
            display: 'flex',
          }}
        >
          {dimension.map((_, x) => (
            <Cell
              key={x}
              size={size}
              field={field}
              mask={mask}
              Mine={Mine}
              died={died}
              y={y}
              x={x}
              setDied={setDied}
              setMask={setMask}
            />
          ))}
        </div>
      ))}
      <Buttons />
    </div>
  );
};

export default GameField;
