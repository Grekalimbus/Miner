import React, { FC } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';

interface Props {
  title: string;
  id: string;
}

const ButtonMainPage: FC<Props> = ({ title, id }) => {
  const history = useHistory();
  return (
    <button onClick={() => history.push(`/play/${id}`)} className={styles.buttonMainPage}>
      {title}
    </button>
  );
};

export default ButtonMainPage;
