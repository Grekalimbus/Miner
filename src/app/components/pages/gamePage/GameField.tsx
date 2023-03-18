import React, { FC, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Mask } from 'src/app/utils/gameField';
import { chekedWin } from 'src/app/utils/checkWin';
import { createField } from 'src/app/utils/createField';
import styles from './index.module.css';
import Cell from './Cell';
import Buttons from './Buttons';

interface Props {
  sizeX: number;
  changeWin: () => void;
  changeDied: () => void;
}

const Mine = -1;

const GameField: FC<Props> = ({ sizeX, changeWin, changeDied }) => {
  const history = useHistory();
  const callCreateField = createField(sizeX, Mine);
  const createMask = new Array(sizeX * sizeX).fill(Mask.Fill);
  const dimension = new Array(sizeX).fill(0);
  const [field, setField] = useState<number[]>(callCreateField);
  const [mask, setMask] = useState<Mask[]>(createMask);
  const [died, setDied] = useState<boolean>(false);
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
              sizeX={sizeX}
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
      {<Buttons />}
    </div>
  );
};

export default GameField;
