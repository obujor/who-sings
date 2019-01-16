import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Header from './components/Header';
import WelcomePage from './components/WelcomePage';
import QuizPage from './components/QuizPage';
import UserPage from './components/UserPage';
import LeaderboardPage from './components/LeaderboardPage'
import PrivateRoute from './PrivateRoute';

import { getLoggedUser, login, logout } from './Auth';
import { getPlayedQuizzes, savePlayedQuizzes } from './Storage';

const styles = theme => ({
  app: {
    textAlign: 'center'
  }
});

class App extends Component {
  state = {
    username: getLoggedUser() || '',
    playedQuizzes: getPlayedQuizzes() || []
  };

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
    if (prevState.playedQuizzes !== this.state.playedQuizzes) {
      savePlayedQuizzes(this.state.playedQuizzes);
    }
  }

  onLogout = () => {
    this.setUsername('');
  }

  onQuizFinished = (score) => {
    this.setState((state) => ({
      playedQuizzes: [{
        username: state.username,
        score: score,
        timestamp: Date.now()
      }, ...state.playedQuizzes]
    }));
  }

  render() {
    const { username, playedQuizzes } = this.state;
    const isLoggedIn = !!username;
    const { classes } = this.props;
    return (
      <div className={classes.app}>
        <Header />
        <Switch>
          <Route path="/" exact render={(props) => (
            <WelcomePage
              startGame={this.startGame}
              setUsername={this.setUsername}
              username={username}
            />
          )}/>
          <Route path="/leaderboard" exact render={(props) => (
            <LeaderboardPage
              username={username}
              playedQuizzes={playedQuizzes}
              lastQuizzesNr={10}
            />
          )}/>
          <PrivateRoute
            path="/quiz"
            exact
            loginPath="/"
            isLoggedIn={isLoggedIn}
            render={() => (
              <QuizPage
                onQuizFinished={this.onQuizFinished}
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
                playedQuizzes={playedQuizzes}
                lastQuizzesNr={10}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(App));
