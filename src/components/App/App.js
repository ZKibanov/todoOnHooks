import React, { useState,useEffect } from 'react';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

const MyContext = React.createContext();

let elId = Date.now() + 1;

const App = () => {
  const [filterOption, setFilter] = useState({filter:'all'});

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

  useEffect (() => setTasks(tasks),[ ])

  function findId (someArray, id){
    return someArray.findIndex((el) => el.id === id);
  } 

  const generateTaskObject = (descriptionText, completedStatus = false, timer, createdDate, idNum) => ({
    description: descriptionText,
    completed: completedStatus,
    timeLeft: timer,
    created: createdDate,
    id: idNum,
  });

  const markAsDone = (id) => setTasks(( tasksArray ) => {
      const idx = findId(tasksArray, id);
      const newTasks = [...tasksArray];
      newTasks[idx].completed = !newTasks[idx].completed;
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
  });

  const deleteItem = (id) => setTasks(( tasksArray ) => {
      const idx = findId(tasksArray, id);
      const before = tasksArray.slice(0, idx);
      const after = tasksArray.slice(idx + 1);
      const newTasksArray = [...before, ...after];
      localStorage.setItem('tasks', JSON.stringify(newTasksArray));
      return newTasksArray;
    });

  const filterTasks = (filter) => {
    setFilter({
      filter
    });
  };

  const addItem = (text, minuts = 0, seconds = 0) => {
    if (!text) return;
    const timeLeft = (minuts * 60 + Number(seconds)) * 1000;
    const newItemId = elId + 1;
    elId += 1;
    setTasks(( tasksArray ) => {
      const newItem = generateTaskObject(text.trim(), false, timeLeft, Date.now(), newItemId);
      const newTasksArray = [...tasksArray, newItem];
      localStorage.setItem('tasks', JSON.stringify(newTasksArray));
      return newTasksArray ;
    });
  };

  const renameItem = (text, id) => {
    if (!text) return;
    setTasks(( tasksArray ) => {
      const idx = findId(tasksArray, id);
      const before = tasksArray.slice(0, idx);
      const after = tasksArray.slice(idx + 1);
      const newItem = generateTaskObject(text.trim(), false, tasksArray[idx].timeLeft, Date.now(), id);
      const newTasksArray = [...before, newItem, ...after];
      localStorage.setItem('tasks', JSON.stringify(newTasksArray));
      return newTasksArray ;
    });
  };

  const removeAllCompleted = () => {
    setTasks(() => {
      const newTasksArray = tasksArray.filter((el) => el.completed === false);
      localStorage.setItem('tasks', JSON.stringify(newTasksArray));
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
   setTasks((tasksArray)=>{
    const newTasksArray = [...tasksArray];
    for (let i = 0; i < newTasksArray.length; i++) {
      if (newTasksArray[i].timeLeft > 1000 && newTasksArray[i].countdown) {
        newTasksArray[i].timeLeft -= 1000;
      } else if (newTasksArray[i].timeLeft <= 1000 && newTasksArray[i].countdown){
        newTasksArray[i].timeLeft =1;
        newTasksArray[i].countdown = false;
      }   
    }
     localStorage.setItem('tasks', JSON.stringify(newTasksArray));
     return newTasksArray
    })
  }

  useEffect ( () => {
    const interval = setInterval(updateTimers, 1000)
    return () => clearInterval(interval)
  },[ ])

  const turnOnCountdown = (id) => {
    setTasks(( tasksArray ) => {
      const idx = findId(tasksArray, id);
      const newTasksArray = [...tasksArray];
      newTasksArray[idx].countdown = true;
      localStorage.setItem('tasks', JSON.stringify(newTasksArray));
      return newTasksArray;
    });
  };

  const turnOffCountdown = (id, date) => {
    setTasks((tasksArray) => {
      const idx = findId(tasksArray, id);
      const newTasksArray = [...tasksArray];
      newTasksArray[idx].countdown = false;
      newTasksArray[idx].timeLeft = date;
      localStorage.setItem('tasks', JSON.stringify(newTasksArray));
      return newTasksArray;
    });
  };

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={(text, minuts, seconds) => addItem(text, minuts, seconds)} />
      <section className="main">
        <MyContext.Provider value={applyFilter()}>
        <TaskList
          tasks={applyFilter()}
          onDeleted={deleteItem}
          onDone={markAsDone}
          onRename={renameItem}
          turnOffCountdown={turnOffCountdown}
          turnOnCountdown={turnOnCountdown}
        />
        </MyContext.Provider>
        <Footer
          filterTasks={filterTasks}
          filterOption={filterOption}
          count={count}
          clearCompleted={removeAllCompleted}
        />
      </section>
    </section>
  );
}

export default App;