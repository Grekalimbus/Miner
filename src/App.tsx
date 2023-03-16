import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './app/components/pages/mainPage/MainPage';

export interface STYLES {
  [key: string]: string;
}

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <MainPage />
      </Route>
    </Switch>
  );
}

export default App;
