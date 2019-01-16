import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const timestampToDateStr = (timestamp) => {
  const date = new Date(timestamp);
  const dateStr = date.toDateString();
  const timeStr = date.toTimeString().substring(0, 9);
  return `${dateStr}, ${timeStr}`;
}

const PlayedQuizList = ({ quizzesList, showUser }) =>
  <List>
    {quizzesList.map(({ score, timestamp, username }) =>
      <ListItem
        key={timestamp}
      >
        <Avatar>
          {score}
        </Avatar>
        <ListItemText
          primary={showUser ?
                  `Score ${score} by ${username}` : `Score ${score}`}
          secondary={timestampToDateStr(timestamp)}
        />
      </ListItem>
    )}
  </List>

export default PlayedQuizList;
