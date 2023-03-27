//libs
import React from 'react';
//styles
import styles from './input-text.module.scss';
//types
import { InputTextProps } from '../../types/propses.type';

export default class InputText extends React.Component<InputTextProps> {
  render() {
    return (
      <div className={styles.input}>
        <label htmlFor={this.props.name}>
          {this.props.title}
          <input type="text" id={this.props.name} ref={this.props.myRef} />
        </label>
        <div className={`${!this.props.error && styles.invisible} ${styles.error}`}>
          {this.props.error}
        </div>
      </div>
    );
  }
}
