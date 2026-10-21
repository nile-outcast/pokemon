import { ApolloProvider as Provider } from '@apollo/client';
import * as React from 'react';

import { client } from './client';

export const ApolloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Provider client={client}>{children}</Provider>
);
