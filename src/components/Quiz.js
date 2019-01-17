import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Question from './Question';
import { fetchQuestion } from '../api/musixmatch';

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
  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.addQuestion()
      .finally(() => this.setState({
        isLoading: false,
        currentQuestion: 0
      }));
  }

  addQuestion() {
    return new Promise((resolve, reject) => {
      fetchQuestion(this.props.answersNr)
        .then((question) => {
          this.setState((state) => ({
            questions: [...state.questions, question]
          }), resolve);
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
    const { currentQuestion } = this.state;
    // Wait before switch to the new question let the user see the result
    // and in the meanwhile fetch a new question
    Promise.all([this.addQuestion(), this.wait()])
      .then(() =>
        this.setState({
          currentQuestion: currentQuestion + 1,
        })
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
    const { isLoading } = this.state;

    const currectQuestionNr = this.state.currentQuestion+1;
    const question = currectQuestionNr && this.state.questions[this.state.currentQuestion];

    return (
      <div className={classes.root}>
        {isLoading &&
          <CircularProgress className={classes.progress} />
        }
        {!isLoading && question &&
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
