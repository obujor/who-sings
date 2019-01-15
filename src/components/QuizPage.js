import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Quiz from './Quiz';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    flexGrow: 1,
    overflow: 'hidden',
  },
  playAgainButton: {
    margin: theme.spacing.unit * 3,
  }
});

class QuizPage extends React.Component {
  state = {
    quizFinished: false,
    totalScore: 0,
  };

  handleStart = () => {
    this.setState({
      quizFinished: false,
      totalScore: 0
    });
  };

  onQuizFinished = () => {
    this.setState({
      quizFinished: true
    });
  };

  onScore = (score) => {
    this.setState((state) => ({
      totalScore: state.totalScore + score
    }));
  };

  render() {
    const { classes } = this.props;
    const { totalScore, quizFinished } = this.state;
    return (
      <div className={classes.root}>
        {!quizFinished &&
          <Quiz
            timeoutSec={5}
            nrQuestions={5}
            onFinished={this.onQuizFinished}
            onScore={this.onScore}
            totalScore={totalScore}
            title={"Guess who sings the following"}
          />
        }
        {quizFinished &&
          <div>
            <Typography
              className={classes.question}
              variant="h3"
            >
              Your score is: {totalScore}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.playAgainButton}
              onClick={this.handleStart}
              size="large"
            >
              Play again
            </Button>
          </div>
        }
      </div>
    );
  }
}

export default withStyles(styles)(QuizPage);
