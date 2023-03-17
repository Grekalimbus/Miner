import React, { FC, useEffect, useMemo, useState } from 'react';
import { numberColor } from 'src/app/utils/numberColor';
import styles from './index.module.css';

interface Props {
  size: number;
  changeWin: (value: boolean) => void;
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

const GameField: FC<Props> = ({ size, changeWin }) => {
  const callCreateField = createField(size);
  const createMask = new Array(size * size).fill(Mask.Fill);
  const dimension = new Array(size).fill(0);
  const [field, setField] = useState<number[]>(callCreateField);
  const [mask, setMask] = useState<Mask[]>(createMask);
  const [died, setDied] = useState(false);
  useEffect(() => {
    if (chekedWin()) {
      changeWin(true);
    }
  }, [chekedWin()]);

  function chekedWin() {
    let cheked = 0;
    field.forEach((f, i) => {
      if (
        (f !== Mine && mask[i] === Mask.Transparent) ||
        (f === Mine && mask[i] === Mask.Flag) ||
        (f === Mine && mask[i] === Mask.Fill)
      ) {
        cheked += 1;
      }
    });
    if (cheked === field.length) {
      return true;
    }
  }
  console.log(field);

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
    if (field[y * size + x] === Mine) {
      mask.forEach((_, i) => (mask[i] = Mask.Transparent));
      setDied(true);
    }
    setMask(prev => [...prev]);
    chekedWin();
  }

  function stylesCell(): string {
    if (!died) {
      if (chekedWin() === true) {
        return 'rgba(236, 146, 11, 0.932)';
      }
      return '(233, 233, 233, 0.342)';
    }
    return 'rgba(219, 22, 22, 0.596)';
  }

  function clickContextMenu(x: number, y: number) {
    if (mask[y * size + x] === Mask.Transparent) return;
    if (mask[y * size + x] === Mask.Fill) {
      mask[y * size + x] = Mask.Flag;
    } else if (mask[y * size + x] === Mask.Flag) {
      mask[y * size + x] = Mask.Question;
    } else if (mask[y * size + x] === Mask.Question) {
      mask[y * size + x] = Mask.Fill;
    }
    setMask(prev => [...prev]);
    chekedWin();
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
            <div
              style={{
                backgroundColor: stylesCell(),
                color: numberColor(field[y * size + x]),
              }}
              onClick={() => {
                chekedWin() ?? clickCell(x, y);
              }}
              onContextMenu={e => {
                e.preventDefault();
                chekedWin() ?? clickContextMenu(x, y);
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
