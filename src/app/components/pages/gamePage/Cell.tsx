import React, { FC } from 'react';
import styles from './index.module.css';
import { stylesCell } from 'src/app/utils/stylesCell';
import { numberColor } from 'src/app/utils/numberColor';
import { chekedWin } from 'src/app/utils/checkWin';
import { clickCell } from 'src/app/utils/clickCell';
import { clickContextMenu } from 'src/app/utils/clickContextMenu';
import { Mask, mapMaskToView } from 'src/app/utils/gameField';

interface Props {
  size: number;
  field: number[];
  mask: Mask[];
  Mine: number;
  died: boolean;
  y: number;
  x: number;
  setDied: React.Dispatch<React.SetStateAction<boolean>>;
  setMask: React.Dispatch<React.SetStateAction<Mask[]>>;
}

const Cell: FC<Props> = ({ size, field, mask, Mine, died, y, x, setDied, setMask }) => {
  function stylesForCell(size: number) {
    if (size < 9) {
      return styles.cellSmall;
    } else if (size === 16) {
      return styles.cellBig;
    } else if (size === 32) {
      return styles.cellVeryBig;
    }
  }
  return (
    <div
      className={stylesForCell(size)}
      style={{
        backgroundColor: stylesCell(died, field, mask, Mine),
        color: numberColor(field[y * size + x]),
      }}
      onClick={() => {
        chekedWin(field, mask, Mine) ??
          clickCell(x, y, mask, size, field, Mine, setMask, setDied);
      }}
      onContextMenu={e => {
        e.preventDefault();
        chekedWin(field, mask, Mine) ??
          clickContextMenu(x, y, mask, size, setMask, field, Mine);
      }}
      key={x}
    >
      {mask[y * size + x] !== Mask.Transparent
        ? mapMaskToView[mask[y * size + x]]
        : field[y * size + x] === Mine
        ? '🧨'
        : field[y * size + x]}
    </div>
  );
};

export default Cell;
