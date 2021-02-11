import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';

const TaskList = ({ tasks, onDeleted, onDone, onRename, turnOnCountdown, turnOffCountdown }) => {
  const renderedTasks = tasks.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <Task
        key={id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onDone={() => onDone(id)}
        onRename={(text) => onRename(text, id)}
        onTimer={() => turnOnCountdown(id)}
        offTimer={(date) => turnOffCountdown(id, date)}
      />
    );
  });
  return <ul className="todo-list">{[renderedTasks]}</ul>;
};

TaskList.defaultProps = {
  onDeleted: () => {},
  onDone: () => {},
  onRename: () => {},
  turnOnCountdown: () => {},
  turnOffCountdown: () => {},
  tasks: [
    {
      description: "Program didn't recieved data - that's why you see this message",
      completed: false,
      created: new Date(Date.now()),
      id: 1,
    },
  ],
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDone: PropTypes.func,
  onRename: PropTypes.func,
  onDeleted: PropTypes.func,
  turnOffCountdown: PropTypes.func,
  turnOnCountdown: PropTypes.func,
};

export default TaskList;
