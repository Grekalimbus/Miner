import React, { FC, useEffect, useMemo, useState } from 'react';
import { createField } from 'src/app/utils/createField';
import { numberColor } from 'src/app/utils/numberColor';
import styles from './index.module.css';

interface Props {
  sizeX: number;
  changeWin: () => void;
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

const GameField: FC<Props> = ({ sizeX, changeWin }) => {
  const callCreateField = createField(sizeX, Mine);
  const createMask = new Array(sizeX * sizeX).fill(Mask.Fill);
  const dimension = new Array(sizeX).fill(0);
  const [field, setField] = useState<number[]>(callCreateField);
  const [mask, setMask] = useState<Mask[]>(createMask);
  const [died, setDied] = useState(false);
  useEffect(() => {
    if (chekedWin()) {
      changeWin();
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
    if (mask[y * sizeX + x] === Mask.Transparent) return;
    const clearing: [number, number][] = [];
    function clear(x: number, y: number) {
      if (x >= 0 && x < sizeX && y >= 0 && y < sizeX) {
        if (mask[y * sizeX + x] === Mask.Transparent) return;
        clearing.push([x, y]);
      }
    }
    clear(x, y);
    while (clearing.length) {
      const [x, y] = clearing.pop()!!;
      mask[y * sizeX + x] = Mask.Transparent;
      if (field[y * sizeX + x] !== 0) continue;
      clear(x + 1, y);
      clear(x - 1, y);
      clear(x, y + 1);
      clear(x, y - 1);
    }
    if (field[y * sizeX + x] === Mine) {
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
    if (mask[y * sizeX + x] === Mask.Transparent) return;
    if (mask[y * sizeX + x] === Mask.Fill) {
      mask[y * sizeX + x] = Mask.Flag;
    } else if (mask[y * sizeX + x] === Mask.Flag) {
      mask[y * sizeX + x] = Mask.Question;
    } else if (mask[y * sizeX + x] === Mask.Question) {
      mask[y * sizeX + x] = Mask.Fill;
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
              className={sizeX < 9 ? styles.cellSmall : styles.cellBig}
              style={{
                backgroundColor: stylesCell(),
                color: numberColor(field[y * sizeX + x]),
              }}
              onClick={() => {
                chekedWin() ?? clickCell(x, y);
              }}
              onContextMenu={e => {
                e.preventDefault();
                chekedWin() ?? clickContextMenu(x, y);
              }}
              key={x}
            >
              {mask[y * sizeX + x] !== Mask.Transparent
                ? mapMaskToView[mask[y * sizeX + x]]
                : field[y * sizeX + x] === Mine
                ? '🧨'
                : field[y * sizeX + x]}
            </div>
          ))}
        </div>
      ))}
      <button className={styles.button}>Перезапуск игры</button>
      <button className={styles.button}>Перезапуск игры</button>
    </div>
  );
};

export default GameField;
