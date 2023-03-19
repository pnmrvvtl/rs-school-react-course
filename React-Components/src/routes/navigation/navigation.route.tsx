//libs
import React, { Component } from 'react';
//components
import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../components';
//styles
import styles from './navigation.module.scss';
//types
import { NavigationProps } from '../../types/propses.type';

export class Navigation extends Component<NavigationProps> {
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
