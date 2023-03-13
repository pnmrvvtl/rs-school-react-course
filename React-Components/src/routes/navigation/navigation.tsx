//libs
import React, { Component, ReactNode } from 'react';
//components
import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../components';
//styles
import styles from './navigation.module.scss';

interface Props {
  children?: ReactNode;
}

export class Navigation extends Component<Props> {
  render() {
    return (
      <div className={styles.container}>
        <Header />
        {this.props.children || <Outlet />}
        <Footer />
      </div>
    );
  }
}

export default Navigation;
