import React, { Component } from 'react';

import { Switch, Route, withRouter } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import WelcomePage from './components/WelcomePage';
import QuizPage from './components/QuizPage';
import UserPage from './components/UserPage';
import PrivateRoute from './PrivateRoute';

import { getLoggedUser, login, logout } from './Auth';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: getLoggedUser() || '',
    };
  }

  startGame = () => {
    this.props.history.push('/quiz');
  }

  setUsername = (username) => {
    this.setState({username});
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.username !== this.state.username) {
      if (this.state.username) {
        login(this.state.username);
      } else {
        logout();
      }
    }
  }

  onLogout = () => {
    this.setUsername('');
  }

  render() {
    const username = this.state.username;
    const isLoggedIn = !!username;
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact render={(props) => (
            <WelcomePage
              startGame={this.startGame}
              setUsername={this.setUsername}
              username={username}
            />
          )}/>
          <PrivateRoute
            path="/quiz"
            exact
            loginPath="/"
            isLoggedIn={isLoggedIn}
            render={() => (
              <QuizPage
                nrQuestions={5}
              />
            )}
          />
          <PrivateRoute
            path="/user"
            exact
            loginPath="/"
            isLoggedIn={isLoggedIn}
            render={() => (
              <UserPage
                username={username}
                logout={this.onLogout}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
