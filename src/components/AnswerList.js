import React from 'react';
import List from '@material-ui/core/List';

import Answer from './Answer';

class AnswerList extends React.Component {
  state = {
    selectedId: -1
  }

  onSelected = (selectedId) => {
    this.setState({
      selectedId
    });
    this.props.onAnswer(selectedId);
  }

  render() {
    const {
      answers,
      correctAnswerId,
      isSelectable
    } = this.props;
    const { selectedId } = this.state;
    return (
      <List>
        {answers.map((answer, id) =>
          <Answer
            key={id}
            answer={answer}
            answerId={id}
            selectedId={selectedId}
            onSelected={this.onSelected}
            isCorrect={correctAnswerId === id}
            isSelectable={isSelectable}
          />
        )}
      </List>
    );
  }
}
export default AnswerList;
