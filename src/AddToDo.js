import React, { useState, useEffect } from 'react';

const taskQueue = [];
let isBatchUpdateScheduled = false;

function TaskForm({ addTask }) {
  const [task, setTask] = useState('');

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    
    queueTask(task);
    setTask('');
  };

  function queueTask(newTask) {
    taskQueue.push(newTask);
    if (taskQueue.length >= 5 && !isBatchUpdateScheduled) {
      isBatchUpdateScheduled = true;
      setTimeout(() => {
        processTaskQueue();
        isBatchUpdateScheduled = false;
      }, 2000);
    }
  }

  function processTaskQueue() {
    while (taskQueue.length > 0) {
      const taskToProcess = taskQueue.shift();
      addTask(taskToProcess);
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="taskInput">Task Description</label>
      <input
        id="taskInput"
        type="text"
        value={task}
        onChange={handleChange}
        placeholder="Enter your task here..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;