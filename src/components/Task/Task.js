import React, { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';
import PropTypes from 'prop-types';
import Timer from '../Timer';

const Task = (props) => {
  const { description, created, onDeleted, onTimer, offTimer, timeLeft, onDone, countdown, completed } = props;
  let { status } = props;
  const [editing, setEditing] = useState(false);

  const turnToEdit = () => {
    setEditing(true);
  };

  const onSubmit = (ev) => {
    const { onRename } = props;
    ev.preventDefault();
    onRename(ev.target.lastChild.value);
    setEditing(false);
  };

  let timer;
  if (timeLeft === 'x') {
    timer = <Timer timeLeft={1} countdown={false} />;
  } else if (timeLeft) {
    timer = <Timer timeLeft={timeLeft} countdown={countdown} onTimer={onTimer} offTimer={(date) => offTimer(date)} />;
  } else {
    timer = null;
  }

  if (completed) {
    status = 'completed';
  }

  if (editing) {
    status = 'editing';
  }

  return (
    <li className={status}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={onDone} />
        <label>
          <span className="title">{description}</span>
          <span className="created">{`создана ${formatDistanceToNow(created, {
            addSuffix: true,
            locale: ruLocale,
            includeSeconds: true,
          })}`}</span>
          {timer}
        </label>
        <button aria-label="edit" type="button" className="icon icon-edit" onClick={turnToEdit} />
        <button aria-label="delete" type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" defaultValue={description} className="edit" />
      </form>
    </li>
  );
};

Task.defaultProps = {
  status: '',
  created: Date.now(),
  description: 'this task is missing',
  completed: false,
  timeLeft: 0,
  countdown: false,
  onRename: () => {},
  onDeleted: () => {},
  onDone: () => {},
  onTimer: () => {},
  offTimer: () => {},
};

Task.propTypes = {
  description: PropTypes.string,
  completed: PropTypes.bool,
  status: PropTypes.string,
  created: PropTypes.number,
  onRename: PropTypes.func,
  onDeleted: PropTypes.func,
  onDone: PropTypes.func,
  timeLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  countdown: PropTypes.bool,
  onTimer: PropTypes.func,
  offTimer: PropTypes.func,
};

export default Task;
