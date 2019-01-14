import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  question: {
    '&:before': {
      content: 'open-quote'
    },
    '&:after': {
      content: 'close-quote'
    }
  },
});

const Question = ({ classes, question }) =>
  <Typography
    className={classes.question}
    color="primary"
    variant="h3"
  >
    {question}
  </Typography>
export default withStyles(styles)(Question);
