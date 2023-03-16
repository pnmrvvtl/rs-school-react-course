import React from 'react';

interface PathContextType {
  path: string;
  setPath: React.Dispatch<React.SetStateAction<string>>;
}

export const PathContext = React.createContext<PathContextType>({
  path: '',
  setPath: () => {},
});
