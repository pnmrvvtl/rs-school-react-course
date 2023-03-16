import React from 'react';

interface SearchContextType {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = React.createContext<SearchContextType>({
  searchString: '',
  setSearchString: () => {},
});
