import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';

const styles = theme => ({
  greenAvatar: {
    color: '#fff',
    backgroundColor: green[500],
  },
  orangeAvatar: {
    color: '#fff',
    backgroundColor: orange[500],
  },
  redAvatar: {
    color: '#fff',
    backgroundColor: red[500],
  },
});

const getUrgencyClass = (urgencyLevel) => {
  if (urgencyLevel >= 0.7)
    return 'greenAvatar';
  if (urgencyLevel >= 0.4)
    return 'orangeAvatar';
  return 'redAvatar';
}
const Timer = ({ classes, secondsLeft, urgencyLevel }) =>
  <Avatar className={classes[getUrgencyClass(urgencyLevel)]}>
    {secondsLeft}
  </Avatar>

export default withStyles(styles)(Timer);
