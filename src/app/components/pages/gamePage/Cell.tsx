import React, { FC } from 'react';
import styles from './index.module.css';
import { stylesCell } from 'src/app/utils/stylesCell';
import { numberColor } from 'src/app/utils/numberColor';
import { chekedWin } from 'src/app/utils/checkWin';
import { clickCell } from 'src/app/utils/clickCell';
import { clickContextMenu } from 'src/app/utils/clickContextMenu';
import { Mask, mapMaskToView } from 'src/app/utils/gameField';

interface Props {
  sizeX: number;
  field: number[];
  mask: Mask[];
  Mine: number;
  died: boolean;
  y: number;
  x: number;
  setDied: React.Dispatch<React.SetStateAction<boolean>>;
  setMask: React.Dispatch<React.SetStateAction<Mask[]>>;
}

const Cell: FC<Props> = ({ sizeX, field, mask, Mine, died, y, x, setDied, setMask }) => {
  return (
    <div
      className={sizeX < 9 ? styles.cellSmall : styles.cellBig}
      style={{
        backgroundColor: stylesCell(died, field, mask, Mine),
        color: numberColor(field[y * sizeX + x]),
      }}
      onClick={() => {
        chekedWin(field, mask, Mine) ??
          clickCell(x, y, mask, sizeX, field, Mine, setMask, setDied);
      }}
      onContextMenu={e => {
        e.preventDefault();
        chekedWin(field, mask, Mine) ??
          clickContextMenu(x, y, mask, sizeX, setMask, field, Mine);
      }}
      key={x}
    >
      {mask[y * sizeX + x] !== Mask.Transparent
        ? mapMaskToView[mask[y * sizeX + x]]
        : field[y * sizeX + x] === Mine
        ? '🧨'
        : field[y * sizeX + x]}
    </div>
  );
};

export default Cell;
