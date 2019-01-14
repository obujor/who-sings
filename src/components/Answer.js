import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  correct: {
    '&$checked': {
      color: green[500],
    },
  },
  wrong: {
    '&$checked': {
      color: red[500],
    },
  },
  checked: {},
});

const Answer = ({
  answer,
  classes,
  selectedId,
  answerId,
  onSelected,
  isCorrect,
  isSelectable
}) => {
  const isCorrectNotSelectable = (!isSelectable && isCorrect);
  return(
    <ListItem
      button={isSelectable}
      selected={selectedId === answerId}
      onClick={() => isSelectable && onSelected(answerId)}
    >
      <Radio
        classes={{
          root: isCorrect ? classes.correct : classes.wrong,
          checked: classes.checked,
        }}
        checked={selectedId === answerId || isCorrectNotSelectable}
      />
      <ListItemText primary={answer} />
    </ListItem>
  )
}

export default withStyles(styles)(Answer);
