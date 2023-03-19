import React, { FC, useState, useEffect } from 'react';
import { TableData } from 'src/app/store/tableSlice';
import { useAppSelector } from 'src/hooks';
import styles from './index.module.css';

const Table: FC = () => {
  const tableResult = useAppSelector(state => state.table.tableData);
  const [table, setTable] = useState<TableData[] | null>(null);

  useEffect(() => {
    if (tableResult?.length) {
      const sortArr: TableData[] = [...tableResult].sort((a: TableData, b: TableData) => {
        return a.timeNum - b.timeNum;
      });
      setTable(sortArr);
      console.log(table);
    }
  }, [tableResult]);

  return (
    <div className={styles.wrapper}>
      {!table?.length ? (
        <div>Данные отсутствуют</div>
      ) : (
        table.map(item => (
          <div
            className={styles.list}
            key={item.nik + item.time + item.timeNum}
          >{`${item.nik} ${item.lvl} ${item.time}`}</div>
        ))
      )}
    </div>
  );
};

export default Table;
