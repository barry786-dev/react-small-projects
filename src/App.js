import React, { useEffect, useState } from 'react';
import UseHttp from './hooks/use-http';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const transformTasks = (taskObj) => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const { isLoading, error, dataRequest: fetchTasks } = UseHttp();

  /*  const fetchTasks = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://react-http-fb840-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }; */

  useEffect(() => {
    fetchTasks(
      {
        url: 'https://react-http-fb840-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
