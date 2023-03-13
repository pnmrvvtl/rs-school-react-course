//libs
import React, { Component } from 'react';
//styles
import styles from './header.module.scss';
import { Link } from 'react-router-dom';

export class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <Link to={'/'}>
          <p className={styles.link}>MAIN</p>
        </Link>
        <Link to={'/about'}>
          <p className={styles.link}>ABOUT</p>
        </Link>
      </div>
    );
  }
}

export default Header;
