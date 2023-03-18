import React, { FC } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';

interface Props {
  title: string;
  id: string;
}

const ButtonMainPage: FC<Props> = ({ title, id }) => {
  const history = useHistory();
  function stylesTable() {
    if (id !== 'table') return;
    return { width: '60%', height: '40px', 'margin-top': '30px' };
  }
  return (
    <button
      onClick={() => history.push(id !== 'table' ? `/play/${id}` : `/${id}`)}
      className={styles.buttonMainPage}
      style={stylesTable()}
    >
      {title}
    </button>
  );
};

export default ButtonMainPage;
