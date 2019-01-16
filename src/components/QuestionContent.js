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

const QuestionContent = ({ classes, content }) =>
  <Typography
    className={classes.question}
    color="primary"
    variant="h5"
  >
    {content}
  </Typography>
export default withStyles(styles)(QuestionContent);
