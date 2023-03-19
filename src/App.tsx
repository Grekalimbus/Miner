import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAppDispatch } from './hooks';
import { loadData } from './app/store/tableSlice';
import GamePage from './app/components/pages/gamePage/GamePage';
import MainPage from './app/components/pages/mainPage/MainPage';
import Table from './app/components/pages/Table/Table';

export interface STYLES {
  [key: string]: string;
}

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadData());
  }, []);

  return (
    <div style={{ overflow: 'auto', height: '100vh' }}>
      <Switch>
        <Route path="/Miner" exact>
          <MainPage />
        </Route>
        <Route path="/play/:id?" exact>
          <GamePage />
        </Route>
        <Route path="/table">
          <Table />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
