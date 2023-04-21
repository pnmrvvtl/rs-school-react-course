//libs
import React from 'react';
import { Link } from 'react-router-dom';
//styles
import styles from './header.module.scss';
//images
import Logo from '../../assets/images/logo.gif';
//utils
import { withRouter, WithRouterProps } from '../../utils/withRouter';

export function Header(props: WithRouterProps) {
  const { pathname } = props.location;

  return (
    <header className={styles.header}>
      <Link to={'/'}>
        <p className={styles.link}>MAIN</p>
      </Link>
      <Link to={'/form'}>
        <p className={styles.link}>FORM</p>
      </Link>
      <Link to={'/'}>
        <img alt={'react logo'} height={75} src={Logo} />
      </Link>
      <div className={styles.location}>{`You are here: ${decodeURI(pathname)}`}</div>
      <Link to={'/about'}>
        <p className={styles.link}>ABOUT</p>
      </Link>
    </header>
  );
}

export default withRouter(Header);
