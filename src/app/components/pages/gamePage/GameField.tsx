import React, { FC, useEffect, useState } from 'react';
import { Mask } from 'src/app/utils/gameField';
import { chekedWin } from 'src/app/utils/checkWin';
import { createField } from 'src/app/utils/createField';
import styles from './index.module.css';
import Cell from './Cell';
import Buttons from './Buttons';
import { createBigField } from 'src/app/utils/createBigField';
import { createVeryBigField } from 'src/app/utils/createVeryBigField';

interface Props {
  size: number;
  changeWin: () => void;
  changeDied: () => void;
}

const Mine = -1;

const GameField: FC<Props> = ({ size, changeWin, changeDied }) => {
  const callCreateField = sizeField();
  const createMask = new Array(size * size).fill(Mask.Fill);
  const dimension = new Array(size).fill(0);
  const [field, setField] = useState<number[]>(callCreateField);
  const [mask, setMask] = useState<Mask[]>(createMask);
  const [died, setDied] = useState<boolean>(false);

  function sizeField(): number[] {
    if (size === 8) {
      return createField(size, Mine);
    }
    if (size === 16) {
      return createBigField(size, Mine);
    }
    return createVeryBigField(size, Mine);
  }

  useEffect(() => {
    if (chekedWin(field, mask, Mine)) {
      changeWin();
    }
    if (died) {
      changeDied();
    }
  }, [chekedWin(field, mask, Mine), died]);

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
            />
          ))}
        </div>
      ))}
      <Buttons />
    </div>
  );
};

export default GameField;
