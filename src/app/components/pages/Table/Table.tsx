import React, { FC, useState, useEffect } from 'react';
import { TableData } from 'src/app/store/tableSlice';
import { cheksForUseEffect } from 'src/app/utils/table/cheksForUseEffect';
import { useAppSelector } from 'src/hooks';
import styles from './index.module.css';
import ButtonsLVL from './ButtonsLVL';
import List from './List';
import { useHistory } from 'react-router-dom';

const Table: FC = () => {
  const tableResult = useAppSelector(state => state.table.tableData);
  const [table, setTable] = useState<TableData[] | null>([]);
  const history = useHistory();
  useEffect(() => {
    cheksForUseEffect(tableResult, setTable);
  }, [tableResult]);
  return !table?.length ? (
    <div>Данные отсутствуют</div>
  ) : (
    <div className={styles.wrapper}>
      Сортировка по сложности
      <ButtonsLVL table={table} setTable={setTable} />
      <button onClick={() => history.push('/')} className={styles.buttonHome}>
        Главная страница
      </button>
      {table.map(item => (
        <List item={item} key={item.nik + item.time + item.timeNum} />
      ))}
    </div>
  );
};

export default Table;
