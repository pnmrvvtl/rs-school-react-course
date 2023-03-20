//libs
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//assets
import ErrorImage from '../../assets/images/404.png';
//styles
import styles from './error.module.scss';

export class Error extends Component {
  render() {
    return (
      <div className={styles.container}>
        <img width={300} height={200} src={ErrorImage} />
        <p>
          Sorry, your page isn&apos;t found. You can go to the <Link to={'/'}>main page</Link>
        </p>
      </div>
    );
  }
}

export default Error;
