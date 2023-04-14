//libs
import React, { useContext, useEffect, useState } from 'react';
//styles
import styles from './search.module.scss';
import { useAppDispatch } from '../../store/store.redux';
import { setQuery } from '../../store/slices/search.slice';
export default function Search() {
  const [inputSearchString, setInputSearchString] = useState<string>('');
  // const { setSearchString } = useContext(SearchContext);
  const dispatch = useAppDispatch();

  window.onbeforeunload = () => {
    localStorage.setItem('search', inputSearchString);
  };

  useEffect(() => {
    const search = localStorage.getItem('search');
    if (search) {
      setInputSearchString(search);
    }
  }, []);

  useEffect(() => {
    return () => {
      localStorage.setItem('search', inputSearchString);
    };
  }, [inputSearchString]);

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
