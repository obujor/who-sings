import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    flexGrow: 1,
    overflow: 'hidden',
  },
  startButton: {
    margin: theme.spacing.unit * 3
  }
});

class WelcomePage extends React.Component {

  constructor(props) {
    super(props);

    this.handleStart = this.handleStart.bind(this);

    this.state = {
      username: '',
    };
  }

  setUsername = event => {
    this.setState({
      username: event.target.value,
    });
  }

  handleStart() {
    const { startGame, setUsername } = this.props;
    if (this.state.username) {
      setUsername(this.state.username);
    }
    startGame();
  }

  render() {
    const {
      classes,
      username: loggedUsername
    } = this.props;
    const { username } = this.state;
    const canStart = !!(loggedUsername || username);
    return (
      <div className={classes.root}>
        <Typography variant="h6" color="inherit">
          This is a quiz game in which you have to guess the singer from a line of the song lyrics.
        </Typography>
        {loggedUsername ? (
          <div>
            <Typography variant="h6" color="inherit">
              Welcome back
            </Typography>
            <Typography variant="h5" color="primary">
              {loggedUsername}
            </Typography>
          </div>
        ) : (
          <div>
            <Typography variant="h6" color="primary">
              Insert your name
            </Typography>
            <TextField
              id="outlined-name"
              label="Name"
              className={classes.textField}
              value={username}
              onChange={this.setUsername}
              margin="normal"
              variant="outlined"
            />
          </div>
        )}
        <Button
          variant="contained"
          color="primary"
          className={classes.startButton}
          onClick={this.handleStart}
          disabled={!canStart}
          size="large"
        >
          Let's Play
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(WelcomePage);
