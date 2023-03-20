//libs
import React, { Component } from 'react';
//styles
import styles from './footer.module.scss';

export class Footer extends Component {
  render() {
    return (
      <div className={styles.footer}>
        <a href={'https://rs.school/'} target="_blank" rel="noreferrer">
          <div className={styles.logo}></div>
        </a>
        <a href={'https://github.com/pnmrvvtl'} target="_blank" rel="noreferrer">
          Github @pnmrvvtl
        </a>
      </div>
    );
  }
}

export default Footer;
