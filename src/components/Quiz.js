import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import Question from './Question';
import { fetchQuestions } from '../api/musixmatch';

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  progress: {
    margin: theme.spacing.unit * 5,
  },
});

class Quiz extends React.Component {
  state = {
    currentQuestion: -1,
    questions: [],
    isLoading: false,
    requestError: false,
  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.addQuestions()
      .finally(() => this.setState({
        isLoading: false,
        currentQuestion: 0
      }));
  }

  addQuestions() {
    const { nrQuestions, answersNr } = this.props;
    return new Promise((resolve, reject) => {
      fetchQuestions(nrQuestions, answersNr)
        .then((questions) => {
          this.setState({
            questions: [...questions],
            requestError: false
          }, resolve);
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            requestError: true
          });
          reject(err);
        });
    });
  }

  onAnswer = (score) => {
    this.props.onScore(score);

    const { currentQuestion } = this.state;
    const { nrQuestions } = this.props;
    if (currentQuestion + 1 === nrQuestions) {
      return this.wait()
              .then(() => this.props.onFinished())
    }
    this.nextQuestion();
  }

  nextQuestion() {
    this.wait()
      .then(() =>
        this.setState(state => ({
          currentQuestion: state.currentQuestion + 1,
        }))
      );
  }

  wait = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 600);
    });
  }

  render() {
    const {
      classes,
      title,
      nrQuestions,
      timeoutSec,
      totalScore
    } = this.props;
    const { isLoading, requestError } = this.state;

    const currectQuestionNr = this.state.currentQuestion+1;
    const question = currectQuestionNr && this.state.questions[this.state.currentQuestion];

    return (
      <div className={classes.root}>
        {isLoading &&
          <CircularProgress className={classes.progress} />
        }
        {requestError &&
          <Typography
            component="div"
            variant="h5"
            color="secondary"
          >
            There's an error in the calling of Musixmatch API, try later please.
          </Typography>
        }
        {!isLoading && !requestError && !question &&
          <Typography
            component="div"
            variant="h5"
            color="secondary"
          >
            There're no question to display.
          </Typography>
        }
        {!isLoading && !requestError && question &&
          <Question
            key={currectQuestionNr}
            title={title}
            nrQuestions={nrQuestions}
            timeoutSec={timeoutSec}
            currectQuestionNr={currectQuestionNr}
            content={question.content}
            answers={question.answers}
            copyright={question.copyright}
            correctAnswerId={question.correctAnswer}
            totalScore={totalScore}
            onAnswer={this.onAnswer}
          />
        }
      </div>
    )
  }
}

export default withStyles(styles)(Quiz);
