//libs
import React from 'react';
import { Link } from 'react-router-dom';
//styles
import styles from './header.module.scss';
//images
import Logo from '../../assets/images/logo.gif';
//utils
import { withRouter, WithRouterProps } from '../../utils/withRouter';

export class Header extends React.Component<WithRouterProps> {
  render() {
    const { pathname } = this.props.location;

    return (
      <div className={styles.header}>
        <Link to={'/'}>
          <p className={styles.link}>MAIN</p>
        </Link>
        <Link to={'/'}>
          <img alt={'react logo'} height={75} src={Logo} />
        </Link>
        <div className={styles.location}>{`You are here: ${decodeURI(pathname)}`}</div>
        <Link to={'/about'}>
          <p className={styles.link}>ABOUT</p>
        </Link>
      </div>
    );
  }
}

export default withRouter(Header);
