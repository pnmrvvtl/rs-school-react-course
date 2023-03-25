//libs
import React, { Component } from 'react';
//styles
import styles from './input-select.module.scss';
//types
import { InputSelectProps } from '../../types/propses.type';

class InputSelect extends Component<InputSelectProps> {
  render() {
    return (
      <div className={styles.input}>
        <label htmlFor={this.props.name}>
          Select {this.props.name}:
          <select id={this.props.name} ref={this.props.myRef}>
            <option value="">--Please choose an option--</option>
            {this.props.options.map((el, idx) => (
              <option value={el} key={idx}>
                {el}
              </option>
            ))}
          </select>
        </label>
        <div className={`${!this.props.error && styles.invisible} ${styles.error}`}>
          {this.props.error}
        </div>
      </div>
    );
  }
}

export default InputSelect;
