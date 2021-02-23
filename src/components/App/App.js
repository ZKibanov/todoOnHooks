import React, { useState, useEffect } from 'react';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import MyContext from '../Context/Context';

let elId = Date.now() + 1;

const App = () => {
  const [filterOption, setFilter] = useState({ filter: 'all' });

  let tasks;
  if (!localStorage.getItem('tasks')) {
    tasks = [
      {
        description: 'Completed task',
        completed: true,
        created: 1608843600000,
        id: 1,
      },
      {
        description: 'Editing task',
        completed: false,
        created: 1608411600000,
        id: 2,
      },
      {
        description: 'Active task',
        completed: false,
        created: 1577836800000,
        timeLeft: 743000,
        id: 3,
      },
    ];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  const count = tasks.filter((el) => !el.completed).length;
  const [tasksArray, setTasks] = useState([]);
  const [hasTimers,setCountdown] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTasks(tasks), []);
  useEffect(() => localStorage.setItem('tasks', JSON.stringify(tasksArray)), [tasksArray]);

  function findId(someArray, id) {
    return someArray.findIndex((el) => el.id === id);
  }

  const generateTaskObject = (descriptionText, completedStatus = false, timer, createdDate, idNum) => ({
    description: descriptionText,
    completed: completedStatus,
    timeLeft: timer,
    created: createdDate,
    id: idNum,
  });

  const markAsDone = (id) =>
    setTasks((oldTasks) => {
      const idx = findId(oldTasks, id);
      const newTasksArray = [...oldTasks];
      newTasksArray[idx].completed = !newTasksArray[idx].completed;
      return newTasksArray;
    });

  const deleteItem = (id) =>
    setTasks((oldTasks) => {
      const idx = findId(oldTasks, id);
      const before = oldTasks.slice(0, idx);
      const after = oldTasks.slice(idx + 1);
      const newTasksArray = [...before, ...after];
      return newTasksArray;
    });

  const filterTasks = (filter) => {
    setFilter({
      filter,
    });
  };

  const addItem = (text, minuts = 0, seconds = 0) => {
    if (!text) return;
    const timeLeft = (minuts * 60 + Number(seconds)) * 1000;
    const newItemId = elId + 1;
    elId += 1;
    setTasks((oldTasks) => {
      const newItem = generateTaskObject(text.trim(), false, timeLeft, Date.now(), newItemId);
      const newTasksArray = [...oldTasks, newItem];
      return newTasksArray;
    });
  };

  const renameItem = (text, id) => {
    if (!text) return;
    setTasks((oldTasks) => {
      const idx = findId(oldTasks, id);
      const before = oldTasks.slice(0, idx);
      const after = oldTasks.slice(idx + 1);
      const newItem = generateTaskObject(text.trim(), false, oldTasks[idx].timeLeft, Date.now(), id);
      const newTasksArray = [...before, newItem, ...after];
      return newTasksArray;
    });
  };

  const removeAllCompleted = () => {
    setTasks((oldTasks) => {
      const newTasksArray = oldTasks.filter((el) => el.completed === false);
      return newTasksArray;
    });
  };

  const applyFilter = () => {
    const filterOpt = filterOption.filter;
    const res = [...tasksArray];
    switch (filterOpt) {
      case 'active':
        return res.filter((el) => el.completed === false);
      case 'completed':
        return res.filter((el) => el.completed === true);
      default:
        return res;
    }
  };

  const updateTimers = () => {
    setTasks((oldTasks) => {
      const newTasksArray = [...oldTasks];
      for (let i = 0; i < newTasksArray.length; i++) {
        if (newTasksArray[i].timeLeft > 1000 && newTasksArray[i].countdown) {
          newTasksArray[i].timeLeft -= 1000;
        } else if (newTasksArray[i].timeLeft <= 1000 && newTasksArray[i].countdown) {
          newTasksArray[i].timeLeft = 1;
          newTasksArray[i].countdown = false;
        }
      }
      localStorage.setItem('tasks', JSON.stringify(newTasksArray));
      return newTasksArray;
    });
  };

  function hasActiveTimers() {
    let activeTimers = 0;
    for (let i = 0; i < tasksArray.length; i++) {
      if (tasksArray[i].countdown) {
        activeTimers += 1;
      }
    }
    return activeTimers;
  }

  useEffect(() => {
    let interval = null
    if (hasTimers) {
      interval = setInterval(updateTimers, 1000);
    } else {
      clearInterval(interval)
    }
    return ()=>clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasTimers]);

  const turnOnCountdown = (id) => {
    if (!hasTimers) {setCountdown(true)}
    setTasks((oldTasks) => {
      const idx = findId(oldTasks, id);
      const newTasksArray = [...oldTasks];
      newTasksArray[idx].countdown = true;
      return newTasksArray;
    });
  };

  const turnOffCountdown = (id, date) => {
    const timers = hasActiveTimers();
    if ( timers === 1){setCountdown(false)}
    setTasks((oldTasks) => {
      const idx = findId(oldTasks, id);
      const newTasksArray = [...oldTasks];
      newTasksArray[idx].countdown = false;
      newTasksArray[idx].timeLeft = date;
      return newTasksArray;
    });
  };

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={(text, minuts, seconds) => addItem(text, minuts, seconds)} />
      <section className="main">
        <MyContext.Provider value={applyFilter()}>
          <TaskList
            onDeleted={deleteItem}
            onDone={markAsDone}
            onRename={renameItem}
            turnOffCountdown={turnOffCountdown}
            turnOnCountdown={turnOnCountdown}
          />
          <Footer
            filterTasks={filterTasks}
            filterOption={filterOption}
            count={count}
            clearCompleted={removeAllCompleted}
          />
        </MyContext.Provider>
      </section>
    </section>
  );
};

export default App;
