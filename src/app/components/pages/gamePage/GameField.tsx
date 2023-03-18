import React, { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { Mask } from 'src/app/utils/gameField';
import Cell from './Cell';
import Buttons from './Buttons';
import { chekedWin } from 'src/app/utils/checkWin';
import { checksInUseEffect } from 'src/app/utils/checksInUseEffect';
import { sizeField } from 'src/app/utils/sizeField';

interface Props {
  size: number;
  changeWin: () => void;
  changeDied: () => void;
  time: number;
  lose: boolean;
}

const Mine = -1;

const GameField: FC<Props> = ({ size, changeWin, changeDied, time, lose }) => {
  const callCreateField = sizeField(size, Mine);
  const createMask = new Array(size * size).fill(Mask.Fill);
  const dimension = new Array(size).fill(0);
  const [field, setField] = useState<number[]>(callCreateField);
  const [mask, setMask] = useState<Mask[]>(createMask);
  const [died, setDied] = useState<boolean>(false);

  useEffect(() => {
    checksInUseEffect(field, mask, Mine, size, time, changeWin, changeDied, died, lose);
  }, [chekedWin(field, mask, Mine), died, time, lose]);

  console.log(field);

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
              lose={lose}
            />
          ))}
        </div>
      ))}
      <Buttons />
    </div>
  );
};

export default GameField;
