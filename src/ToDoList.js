import React, { useState } from 'react';

function Tasks({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks); // Fixed to use initialTasks

  const removeTask = (index) => {
    setTasks(currentTasks => {
      const newTasks = currentTasks.filter((_, i) => i !== index);
      logToConsole(`Task removed at index ${index}. Updated tasks count: ${newTasks.length}.`); // Log on task removal
      return newTasks;
    });
  };

  const logToConsole = (message) => {
    // Function to log messages to the console
    console.log(message);
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task.description} 
          <button onClick={() => removeCard(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;