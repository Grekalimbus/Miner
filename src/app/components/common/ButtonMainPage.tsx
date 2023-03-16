import React, { FC } from 'react';
import styles from './index.module.css';

interface Props {
  title: string;
}

const ButtonMainPage: FC<Props> = ({ title }) => {
  return <button className={styles.buttonMainPage}>{title}</button>;
};

export default ButtonMainPage;
