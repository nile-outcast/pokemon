import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from 'src/containers/Home';
import { Legendaries } from 'src/containers/Legendaries';
import { Pokedex } from 'src/containers/Pokedex';

const components = {
  Home: <Home />,
  Pokedex: <Pokedex />,
  Legendaries: <Legendaries />,
};

export const routes: { path: string; component: keyof typeof components }[] = [
  {
    path: '/',
    component: 'Home',
  },
  {
    path: '/pokedex',
    component: 'Pokedex',
  },
  {
    path: '/legendaries',
    component: 'Legendaries',
  },
];

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      {routes.map((route, idx) => (
        <Route key={idx} exact path={route.path}>
          {components[route.component]}
        </Route>
      ))}
    </Switch>
  );
};
