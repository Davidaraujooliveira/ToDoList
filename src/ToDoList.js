import React, { useState } from 'react';

function Tasks({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const removeTask = (index) => {
    setTasks(currentTasks => {
      const newTasks = currentTasks.filter((_, i) => i !== index);
      logToConsole(`Task removed at index ${index}. Updated tasks count: ${newTasks.length}.`);
      return newTasksting
    });
  };

  const addTask = () => {
    if (!newTask.trim()) return; // Prevent adding empty tasks
    setTasks(currentTasks => [...currentTasks, { description: newTask }]);
    logToConsole(`New task added. Total tasks count: ${tasks.length + 1}.`);
    setNewTask(''); // Reset input field after adding
  };

  const editTask = (index, newDescription) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, description: newDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
    logToConsole(`Task at index ${index} updated.`);
  };

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const logToConsole = (message) => {
    console.log(message);
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={handleTaskChange}
          placeholder="Add new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="text"
              value={task.description}
              onChange={(e) => editTask(index, e.target.value)}
            />
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Tasks;