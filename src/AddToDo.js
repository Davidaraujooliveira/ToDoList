import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const [task, setTask] = useState('');

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTask(task);
    setTask('');
  };

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