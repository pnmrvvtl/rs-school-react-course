//libs
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//styles
import styles from './header.module.scss';
//images
import Logo from '../../assets/images/logo.gif';

export class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <Link to={'/'}>
          <p className={styles.link}>MAIN</p>
        </Link>
        <img alt={'react logo'} height={75} src={Logo} />
        <Link to={'/about'}>
          <p className={styles.link}>ABOUT</p>
        </Link>
      </div>
    );
  }
}

export default Header;
