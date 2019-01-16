import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ExitToApp from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import ConfirmDialog from './ConfirmDialog';

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
    backgroundColor: theme.palette.secondary.main
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
    const userFirstLetter = username.charAt(0).toUpperCase();
    const { confirmDialogOpen } = this.state;
    const timestampToDateStr = (timestamp) => {
      const date = new Date(timestamp);
      const dateStr = date.toDateString();
      const timeStr = date.toTimeString().substring(0, 9);
      return `${dateStr}, ${timeStr}`;
    }
    const usersQuizzes = playedQuizzes
                          .filter(quiz => quiz.username === username)
                          .slice(0, lastQuizzesNr)
                          .map(quiz => Object.assign(quiz, {
                            datetime: timestampToDateStr(quiz.timestamp)
                          }));
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {userFirstLetter}
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
              variant: 'h6'
            }}
          />
          <CardContent>
            {usersQuizzes.length > 0 ? (
              <div>
                <Typography
                  color="primary"
                  variant="h5"
                >
                  Last played games
                </Typography>
                <List>
                  {usersQuizzes.map(({ score, timestamp, datetime }) =>
                    <ListItem
                      key={timestamp}
                    >
                      <Avatar>
                        {score}
                      </Avatar>
                      <ListItemText
                        primary={`Score: ${score}`}
                        secondary={datetime}
                      />
                    </ListItem>
                  )}
                </List>
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
