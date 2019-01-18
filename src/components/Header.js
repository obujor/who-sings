import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Score from '@material-ui/icons/Score';
import QueueMusic from '@material-ui/icons/QueueMusic';
import Tooltip from '@material-ui/core/Tooltip';

import IconLinkButton from './IconLinkButton';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  }
});

const Header = ({ classes }) =>
<div className={classes.root}>
  <AppBar color="primary" position="relative">
    <Toolbar>
        <Typography variant="h5" color="inherit">
          Who Sings
        </Typography>
      <div className={classes.grow} />
      <Tooltip title="Quiz">
        <IconLinkButton
          color="inherit"
          to="/"
        >
          <QueueMusic />
        </IconLinkButton>
      </Tooltip>
      <Tooltip title="Leaderboard">
        <IconLinkButton
          color="inherit"
          to="/leaderboard"
        >
          <Score />
        </IconLinkButton>
      </Tooltip>
      <Tooltip title="User">
        <IconLinkButton
          color="inherit"
          to="/user"
        >
          <AccountCircle />
        </IconLinkButton>
      </Tooltip>
    </Toolbar>
  </AppBar>
</div>

export default withStyles(styles)(Header);
