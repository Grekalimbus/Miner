import React, { FC } from 'react';
import styles from './index.module.css';
import { TableData } from 'src/app/store/tableSlice';

interface Props {
  item: TableData;
}

const List: FC<Props> = ({ item }) => {
  return (
    <div
      className={styles.list}
    >{`Nik:${item.nik} | lvl:${item.lvl} | Time:${item.time}`}</div>
  );
};

export default List;
