import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GamePage from './app/components/pages/gamePage/GamePage';
import MainPage from './app/components/pages/mainPage/MainPage';

export interface STYLES {
  [key: string]: string;
}

function App() {
  return (
    <Switch>
      <div style={{ overflow: 'auto', height: '100vh' }}>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/play" exact>
          <GamePage />
        </Route>
      </div>
    </Switch>
  );
}

export default App;
