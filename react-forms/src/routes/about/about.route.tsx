//libs
import React from 'react';
//styles
import styles from './about.module.scss';
//assets
import MonkeyImage from '../../assets/images/monkey.gif';

export function About() {
  return (
    <div className={styles.container}>
      <img alt={'coding monkey'} width={250} height={200} src={MonkeyImage} />
      <div className={styles.text}>
        <p>- 👋 Hi, my name is Vitalii Ponomarov. </p>
        <p>- 👀 And I&apos;m Front-end Developer. </p>
        <p>
          - 🙈 And you can see my work process on the GIF. But have some differences in appearance.{' '}
        </p>
      </div>
    </div>
  );
}

export default About;
