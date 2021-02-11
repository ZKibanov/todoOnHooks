import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = (props) => {

const {onItemAdded} = props;

const [todoLabel,setTodoLabel] = useState('');
const [todoTimerMinuts, setTimerMinuts] = useState('');
const [todoTimerSeconds, setTimerSeconds] = useState('');

const onFormSubmit = (ev) => {
  ev.preventDefault();
  onItemAdded(todoLabel, todoTimerMinuts, todoTimerSeconds);
  setTodoLabel('');
  setTimerMinuts('');
  setTimerSeconds('');
};

const onLabelChange = (ev) => {
  const { target } = ev;
  const { value, name } = target;
  if (name === 'todoLabel') setTodoLabel(value);
  if (name === 'todoTimerMinuts') setTimerMinuts(value);
  if (name === 'todoTimerSeconds') setTimerSeconds(value);
};

const searchText = 'Task';
  return (
    <header className="header">
      <h1>todos</h1>
      <form action="" onSubmit={onFormSubmit} className="new-todo-form">
        <input
          name="todoLabel"
          type="text"
          required
          className="new-todo"
          placeholder={searchText}
          onChange={onLabelChange}
          value={todoLabel}
        />
        <input
          name="todoTimerMinuts"
          type="number"
          className="new-todo-form__timer"
          max="60"
          placeholder="Min"
          onChange={onLabelChange}
          value={todoTimerMinuts}
        />
        <input
          name="todoTimerSeconds"
          type="number"
          className="new-todo-form__timer"
          max="60"
          placeholder="Sec"
          onChange={onLabelChange}
          value={todoTimerSeconds}
        />
        <input className="form-submit-button" type="submit" value="💾" />
      </form>
    </header>
  );
}


NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};

export default NewTaskForm;