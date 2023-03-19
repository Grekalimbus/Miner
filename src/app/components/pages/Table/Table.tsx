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
        return b.timeNum - a.timeNum;
      });
      setTable(sortArr);
      console.log(table);
    }
  }, [tableResult]);

  return !table?.length ? (
    <div>Данные отсутствуют</div>
  ) : (
    <div className={styles.wrapper}>
      Сортировка по сложности
      <div className={styles.wrapperButton}>
        <button className={styles.buttons}>Легкая</button>
        <button className={styles.buttons}>Средняя</button>
        <button className={styles.buttons}>Сложная</button>
      </div>
      {table.map(item => (
        <div
          className={styles.list}
          key={item.nik + item.time + item.timeNum}
        >{`Nik:${item.nik} | lvl:${item.lvl} | Time:${item.time}`}</div>
      ))}
    </div>
  );
};

export default Table;
