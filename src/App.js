import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import QuizPage from './components/QuizPage';
import UserPage from './components/UserPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={QuizPage}/>
          <Route path="/user" exact component={UserPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
