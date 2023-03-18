import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GamePage from './app/components/pages/gamePage/GamePage';
import MainPage from './app/components/pages/mainPage/MainPage';

export interface STYLES {
  [key: string]: string;
}

function App() {
  return (
    <div style={{ overflow: 'auto', height: '100vh' }}>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/play/:id?" exact>
          <GamePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
