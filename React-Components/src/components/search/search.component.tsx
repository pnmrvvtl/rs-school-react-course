//libs
import React from 'react';
//styles
import styles from './search.module.scss';
//contexts
import { SearchContext } from '../../contexts/search.context';

interface SearchState {
  searchInputString: string;
}

export class Search extends React.Component<object, SearchState> {
  constructor(props: object) {
    super(props);
    this.state = { searchInputString: '' };
  }

  componentDidMount() {
    const search = localStorage.getItem('search');
    if (search) {
      this.setState({ searchInputString: search });
    }
    window.addEventListener('beforeunload', this.saveStateToLocalStorage);
  }

  saveStateToLocalStorage = () => {
    localStorage.setItem('search', this.state.searchInputString);
  };

  componentWillUnmount() {
    localStorage.setItem('search', this.state.searchInputString);
  }

  render() {
    const { searchInputString } = this.state;

    return (
      <SearchContext.Consumer>
        {({ setSearchString }) => (
          <div className={styles.container}>
            <input
              className={styles['search-input']}
              type="text"
              placeholder={'Enter your search query...'}
              value={searchInputString}
              onChange={(event) => this.setState({ searchInputString: event.target.value })}
            />
            <input
              className={styles['search-button']}
              type="button"
              width={50}
              height={50}
              value={'SEARCH'}
              onClick={() => setSearchString(searchInputString)}
            />
          </div>
        )}
      </SearchContext.Consumer>
    );
  }
}

export default Search;
