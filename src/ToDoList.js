import React, { useState } from 'react';

function Tasks({ initialTasks }) {
  const [tasks, setTasks] = useState(initialBufferTasks);

  const removeTask = (index) => {
    setTasks(currentTasks => currentTasks.filter((_, i) => i !== index));
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task.description} 
          <button onClick={() => removeTask(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;