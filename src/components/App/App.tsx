import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from 'src/components';
import { ThemeProvider } from 'src/containers';
import { Routes } from 'src/routes';
import styled from 'styled-components';

export const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <PageLayout>
          <Header />
          <Routes />
        </PageLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const PageLayout = styled.div`
  max-width: 1440px;
  margin: auto;
`;
