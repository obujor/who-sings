import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Score from '@material-ui/icons/Score';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import PlayedQuizList from './PlayedQuizList';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    maxWidth: 600,
    minWidth: 300,
    flex: 1,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  }
});

const LeaderboardPage = ({ classes, username, playedQuizzes, lastQuizzesNr  }) => {
  const bestQuizzes = playedQuizzes
                        .sort((a, b) => b.score - a.score)
                        .slice(0, lastQuizzesNr)
                        .map(quiz => Object.assign(quiz, {
                          isCurrentUser: quiz.username === username
                        }));
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <Score />
            </Avatar>
          }
          title="Leaderboard"
          titleTypographyProps={{
            variant: 'h5'
          }}
        />
        <CardContent>
          {bestQuizzes.length > 0 ? (
            <div>
              <Typography
                color="primary"
                variant="h5"
              >
                Highest score games
              </Typography>
              <PlayedQuizList
                quizzesList={bestQuizzes}
                showUser
              />
            </div>
          ) : (
            <Typography
              color="secondary"
              variant="h5"
            >
              No played games saved
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
    );
}
export default withStyles(styles)(LeaderboardPage);
