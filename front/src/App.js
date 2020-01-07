import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PlantList from './Components/PlantList';
import NewPlant from './Components/NewPlant';
import EditPlant from './Components/EditPlant';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={PlantList} />
          <Route path="/newplant" component={NewPlant} />
          <Route path="/editplant/:idPlant" component={EditPlant} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
