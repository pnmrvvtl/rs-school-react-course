//libs
import React from 'react';
//styles
import styles from './input-text.module.scss';
//types
import { InputTextProps } from '../../types/propses.type';

export default function InputText(props: InputTextProps) {
  return (
    <div className={styles.input}>
      <label htmlFor={props.name}>
        {props.title}
        <input type="text" id={props.name} ref={props.myRef} />
      </label>
      <div className={`${!props.error && styles.invisible} ${styles.error}`}>{props.error}</div>
    </div>
  );
}
