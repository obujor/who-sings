import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ExitToApp from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';

import ConfirmDialog from './ConfirmDialog';
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

class UserPage extends React.Component {
  state = {
    confirmDialogOpen: false
  };

  onLogoutClick = () => {
    this.setState({
      confirmDialogOpen: true
    });
  };

  handleLogoutDialogClose = (agreed) => {
    this.setState({
      confirmDialogOpen: false
    });
    if (agreed) {
      this.props.logout();
    }
  };

  render () {
    const { classes, username, playedQuizzes, lastQuizzesNr } = this.props;
    const { confirmDialogOpen } = this.state;
    const usersQuizzes = playedQuizzes
                          .filter(quiz => quiz.username === username)
                          .slice(0, lastQuizzesNr);
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                <AccountCircle />
              </Avatar>
            }
            action={
              <Tooltip title="Logout">
                <IconButton onClick={this.onLogoutClick}>
                  <ExitToApp />
                </IconButton>
              </Tooltip>
            }
            title={username}
            titleTypographyProps={{
              variant: 'h5'
            }}
          />
          <CardContent>
            {usersQuizzes.length > 0 ? (
              <div>
                <Typography
                  color="primary"
                  variant="h5"
                >
                  Your last played games
                </Typography>
                <PlayedQuizList
                  quizzesList={usersQuizzes}
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
        <ConfirmDialog
          question={"Are you sure you want to logout?"}
          handleClose={this.handleLogoutDialogClose}
          isOpen={confirmDialogOpen}
        />
      </div>
    );
  }
}
export default withStyles(styles)(UserPage);
