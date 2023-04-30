//libs
import React from 'react';
//components
import ContentLoader from 'react-content-loader';
//styles
import styles from './skeleton.module.scss';

const Skeleton = () => (
  <ContentLoader
    uniqueKey={'1'}
    className={styles.container}
    speed={2}
    width={240}
    height={350}
    viewBox="0 0 200 300"
    backgroundColor="#a8dadc"
    foregroundColor="#f1faee"
  >
    <rect x="8" y="5" rx="20" ry="20" width="180" height="130" />
    <rect x="10" y="145" rx="0" ry="0" width="80" height="30" />
    <rect x="110" y="145" rx="0" ry="0" width="80" height="30" />
    <rect x="9" y="185" rx="0" ry="0" width="180" height="45" />
    <rect x="110" y="260" rx="7" ry="7" width="80" height="10" />
    <rect x="110" y="280" rx="7" ry="7" width="80" height="10" />
    <rect x="110" y="240" rx="7" ry="7" width="80" height="10" />
    <rect x="10" y="260" rx="7" ry="7" width="80" height="10" />
    <rect x="10" y="280" rx="7" ry="7" width="80" height="10" />
    <rect x="10" y="240" rx="7" ry="7" width="80" height="10" />
  </ContentLoader>
);

export default Skeleton;
