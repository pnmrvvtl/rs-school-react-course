//libs
import React, { useEffect, useState } from 'react';
//styles
import styles from './search.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/store.redux';
import { setQuery } from '../../store/slices/search.slice';

export default function Search() {
  const [inputSearchString, setInputSearchString] = useState<string>('');
  const dispatch = useAppDispatch();
  const searchString = useAppSelector((state) => state.search.query);

  useEffect(() => setInputSearchString(searchString), [searchString]);

  return (
    <div className={styles.container}>
      <input
        className={styles['search-input']}
        type="text"
        placeholder={'Enter your search query...'}
        value={inputSearchString}
        onChange={(event) => setInputSearchString(event.target.value)}
        onKeyUp={(event) => event.key === 'Enter' && dispatch(setQuery(inputSearchString))}
      />
      <input
        className={styles['search-button']}
        type="button"
        width={50}
        height={50}
        value={'SEARCH'}
        onClick={() => dispatch(setQuery(inputSearchString))}
      />
    </div>
  );
}
