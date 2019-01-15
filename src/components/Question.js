import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import QuestionContent from './QuestionContent';
import AnswerList from './AnswerList';
import Timer from './Timer';

const styles = theme => ({
  paper: {
    maxWidth: 800,
    minWidth: 300,
    flex: 1,
  },
  elevation10Correct: {
    boxShadow: '0px 6px 6px -3px rgba(16, 165, 0, 0.2),0px 10px 14px 1px rgba(15, 255, 0, 0.15),0px 4px 18px 3px rgba(12, 186, 1, 0.1)'
  },
  elevation10Wrong: {
    boxShadow: '0px 6px 6px -3px rgba(255, 5, 5, 0.2),0px 10px 14px 1px rgba(255, 0, 0, 0.1),0px 4px 18px 3px rgba(255, 0, 0, 0.1)'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class Question extends React.Component {
  state = {
    secondsLeft: this.props.timeoutSec,
    answeredCorrect: false,
    answeredId: -1,
    answered: false,
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick() {
    this.setState((state) => ({
      secondsLeft: state.secondsLeft - 1
    }));
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.secondsLeft !== this.state.secondsLeft &&
        this.state.secondsLeft === 0) {
      // The timer is expired, fake a wrong answer
      this.onAnswer(-1);
    }
  }

  onAnswer = (answerId) => {
    clearInterval(this.timerID);
    this.setState({
      answeredCorrect: answerId === this.props.correctAnswerId,
      answeredId: answerId,
      answered: true
    }, () => {
      this.props.onAnswer(this.calcScore());
    });
  }

  calcScore() {
    return (this.state.answeredCorrect && this.state.secondsLeft) || 0;
  }

  render() {
    const {
      currectQuestionNr,
      nrQuestions,
      content,
      title,
      answers,
      correctAnswerId,
      timeoutSec,
      classes,
      totalScore,
    } = this.props;

    const {
      answeredCorrect,
      secondsLeft,
      answered
    } = this.state;

    const answerUrgencyLevel = secondsLeft/timeoutSec;
    const cardElevation = answered ? 10 : 2;

    return (
      <Paper
        elevation={cardElevation}
        classes={{
          root: classes.paper,
          elevation10: answeredCorrect ? classes.elevation10Correct : classes.elevation10Wrong
        }}
      >
        <CardHeader
          action={
            <Timer
              secondsLeft={secondsLeft}
              urgencyLevel={answerUrgencyLevel}
            />
          }
          title={`Question ${currectQuestionNr} of ${nrQuestions}`}
          titleTypographyProps={{
            variant: 'h6',
            color: 'textSecondary'
          }}
          subheader={title}
          subheaderTypographyProps={{
            variant: "h5",
            color: 'textPrimary'
          }}
        />
        <CardContent>
          <QuestionContent content={content} />
          <AnswerList
            answers={answers}
            correctAnswerId={correctAnswerId}
            onAnswer={this.onAnswer}
            isSelectable={!answered}
          />
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Typography
            className={classes.question}
            component="span"
            variant="h5"
          >
            Score: {totalScore}
          </Typography>
        </CardActions>
      </Paper>
    )
  }
}
export default withStyles(styles)(Question);
