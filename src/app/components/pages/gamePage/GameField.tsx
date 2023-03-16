import React, { FC, useState } from 'react';
import styles from './index.module.css';

const Mine = -1;
function createField(size: number): number[] {
  const field: number[] = new Array(size * size).fill(0);
  function inc(x: number, y: number) {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      if (field[y * size + x] === Mine) return;
      field[y * size + x] += 1;
    }
  }

  for (let i = 0; i < size; ) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    if (field[y * size + x] === Mine) continue;
    field[y * size + x] = Mine;
    i += 1;
    inc(x + 1, y);
    inc(x - 1, y);
    inc(x, y + 1);
    inc(x, y - 1);
    inc(x + 1, y - 1);
    inc(x - 1, y - 1);
    inc(x + 1, y + 1);
    inc(x - 1, y + 1);
  }
  return field;
}

interface Props {
  size: number;
}

const GameField: FC<Props> = ({ size }) => {
  const callCreateField = createField(size);
  const dimension = new Array(size).fill(0);
  const [field, setField] = useState<number[]>(callCreateField);

  return (
    <div className={styles.wrapperGame}>
      {dimension.map((_, y) => (
        <div key={y} style={{ display: 'flex' }}>
          {dimension.map((_, x) => (
            <div key={x} className={styles.cell}>
              {field[y * size + x]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameField;
