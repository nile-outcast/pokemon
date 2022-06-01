import { ApolloProvider as Provider } from '@apollo/client';
import React, { FC, ReactNode } from 'react';

import { client } from './client';

export const ApolloProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <Provider client={client}>{children}</Provider>
);
