import React, { FC } from 'react';
import { TableData } from 'src/app/store/tableSlice';
import { filterLVL } from 'src/app/utils/table/filterLVL';
import styles from './index.module.css';

interface Props {
  table: TableData[];
  setTable: React.Dispatch<React.SetStateAction<TableData[] | null>>;
}

const ButtonsLVL: FC<Props> = ({ table, setTable }) => {
  return (
    <div className={styles.wrapperButton}>
      <button
        id="1"
        onClick={e => filterLVL(e, table, setTable)}
        className={styles.buttons}
      >
        Легкая
      </button>
      <button
        id="2"
        onClick={e => filterLVL(e, table, setTable)}
        className={styles.buttons}
      >
        Средняя
      </button>
      <button
        id="3"
        onClick={e => filterLVL(e, table, setTable)}
        className={styles.buttons}
      >
        Сложная
      </button>
    </div>
  );
};

export default ButtonsLVL;
