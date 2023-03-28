//libs
import React from 'react';
//components
import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../components';
//styles
import styles from './navigation.module.scss';
//types
import { NavigationProps } from '../../types/propses.type';

export default function Navigation(props: NavigationProps) {
  return (
    <div className={styles.container}>
      <Header />
      {props.children || <Outlet />}
      <Footer />
    </div>
  );
}
