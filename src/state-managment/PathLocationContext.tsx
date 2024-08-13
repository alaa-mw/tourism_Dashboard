import React, { createContext, useState } from 'react';

interface PathLocationContextProps {
  pathLocation: string;
  setPathLocation: (path: string) => void;
}

const PathLocationContext = createContext<PathLocationContextProps>({
  pathLocation: '',
  setPathLocation: () => {},
});

export const PathLocationProvider = PathLocationContext.Provider;

export default PathLocationContext;
