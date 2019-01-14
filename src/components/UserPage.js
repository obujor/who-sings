import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ExitToApp from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';

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
    const { classes, username } = this.props;
    const userFirstLetter = username.charAt(0).toUpperCase();
    const { confirmDialogOpen } = this.state;
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
