import React, { FC, useEffect, useMemo, useState } from 'react';
import { Mask, mapMaskToView } from 'src/app/utils/gameField';
import { useHistory } from 'react-router-dom';
import { chekedWin } from 'src/app/utils/checkWin';
import { createField } from 'src/app/utils/createField';
import { numberColor } from 'src/app/utils/numberColor';
import styles from './index.module.css';
import { stylesCell } from 'src/app/utils/stylesCell';

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
  const [died, setDied] = useState(false);
  useEffect(() => {
    if (chekedWin(field, mask, Mine)) {
      changeWin();
    }
    if (died) {
      changeDied();
    }
  }, [chekedWin(field, mask, Mine), died]);

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
    chekedWin(field, mask, Mine);
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
    chekedWin(field, mask, Mine);
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
                backgroundColor: stylesCell(died, field, mask, Mine),
                color: numberColor(field[y * sizeX + x]),
              }}
              onClick={() => {
                chekedWin(field, mask, Mine) ?? clickCell(x, y);
              }}
              onContextMenu={e => {
                e.preventDefault();
                chekedWin(field, mask, Mine) ?? clickContextMenu(x, y);
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
      <button
        className={styles.button}
        onClick={() => {
          window.location.reload();
        }}
      >
        Перезапуск игры
      </button>
      <button
        className={styles.button}
        onClick={() => {
          history.push('/');
        }}
      >
        Экран настроек
      </button>
    </div>
  );
};

export default GameField;
