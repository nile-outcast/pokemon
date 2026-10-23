import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'src/apollo/ApolloProvider';
import { Header } from 'src/components';
import { ThemeProvider } from 'src/containers';
import { Routes } from 'src/routes';
import styled from 'styled-components';

export const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <ApolloProvider>
        <ThemeProvider>
          <PageLayout>
            <Header />
            <Routes />
          </PageLayout>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  height: 100dvh;
`;
