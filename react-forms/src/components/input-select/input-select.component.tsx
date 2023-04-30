//libs
import React from 'react';
//styles
import styles from './input-select.module.scss';
//types
import { InputSelectProps } from '../../types/propses.type';

export default function InputSelect(props: InputSelectProps) {
  return (
    <div className={styles.input}>
      <label htmlFor={props.name}>
        Select {props.name}:
        <select id={props.name} {...props.register(props.name)}>
          <option value="">--Please choose an option--</option>
          {props.options.map((el, idx) => (
            <option value={el} key={idx}>
              {el}
            </option>
          ))}
        </select>
      </label>
      <div className={`${!props.error && styles.invisible} ${styles.error}`}>{props.error}</div>
    </div>
  );
}
