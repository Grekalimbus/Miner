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

enum Mask {
  Transparent,
  Fill,
  Flag,
  Question,
}

const mapMaskToView: Record<Mask, React.ReactNode> = {
  [Mask.Transparent]: '',
  [Mask.Fill]: '',
  [Mask.Flag]: '🚩',
  [Mask.Question]: '❓',
};

const GameField: FC<Props> = ({ size }) => {
  const callCreateField = createField(size);
  const createMask = new Array(size * size).fill(Mask.Fill);
  const dimension = new Array(size).fill(0);
  const [field, setField] = useState<number[]>(callCreateField);
  const [mask, setMask] = useState<Mask[]>(createMask);

  function clickCell(x: number, y: number) {
    if (mask[y * size + x] === Mask.Transparent) return;
    const clearing: [number, number][] = [];
    function clear(x: number, y: number) {
      if (x >= 0 && x < size && y >= 0 && y < size) {
        if (mask[y * size + x] === Mask.Transparent) return;
        clearing.push([x, y]);
      }
    }
    clear(x, y);
    while (clearing.length) {
      const [x, y] = clearing.pop()!!;
      mask[y * size + x] = Mask.Transparent;
      if (field[y * size + x] !== 0) continue;
      clear(x + 1, y);
      clear(x - 1, y);
      clear(x, y + 1);
      clear(x, y - 1);
    }
    setMask(prev => [...prev]);
  }
  return (
    <div className={styles.wrapperGame}>
      {dimension.map((_, y) => (
        <div key={y} style={{ display: 'flex' }}>
          {dimension.map((_, x) => (
            <div
              onClick={() => {
                clickCell(x, y);
              }}
              onContextMenu={e => {
                e.preventDefault();
                if (mask[y * size + x] === Mask.Transparent) return;
                if (mask[y * size + x] === Mask.Fill) {
                  mask[y * size + x] = Mask.Flag;
                } else if (mask[y * size + x] === Mask.Flag) {
                  mask[y * size + x] = Mask.Question;
                } else if (mask[y * size + x] === Mask.Question) {
                  mask[y * size + x] = Mask.Fill;
                }
                setMask(prev => [...prev]);
              }}
              key={x}
              className={styles.cell}
            >
              {mask[y * size + x] !== Mask.Transparent
                ? mapMaskToView[mask[y * size + x]]
                : field[y * size + x] === Mine
                ? '🧨'
                : field[y * size + x]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameField;
