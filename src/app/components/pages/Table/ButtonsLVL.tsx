import React, { FC } from 'react';
import { TableData } from 'src/app/store/tableSlice';
import { filterLVL } from 'src/app/utils/table/filterLVL';
import { array } from './array';
import styles from './index.module.css';

interface Props {
  table: TableData[];
  setTable: React.Dispatch<React.SetStateAction<TableData[] | null>>;
}

const ButtonsLVL: FC<Props> = ({ table, setTable }) => {
  return (
    <div className={styles.wrapperButton}>
      {array.map(item => {
        return (
          <button
            key={item.id}
            id={item.id}
            onClick={e => filterLVL(e, table, setTable)}
            className={styles.buttons}
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonsLVL;
