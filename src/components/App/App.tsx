import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from 'src/components/Header';
import { Routes } from 'src/routes';
import { theme } from 'src/theme';
import styled, { ThemeProvider } from 'styled-components';

export const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
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
