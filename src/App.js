import React, { useState } from 'react';

function TodoListApp() {
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState(''); // New state for error messages

  const addTask = (e) => {
    e.preventDefault(); 

    try {
      if (!newTask.trim()) {
        throw new Error('Task cannot be empty.'); // Throw an error for empty task
      }
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
      setError(''); // Reset error message on successful operation
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  const toggleTaskCompleted = (id) => {
    try {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    } catch (err) {
      setError('Failed to toggle the task status.'); // Set a generic error message
    }
  };

  const deleteTask = (id) => {
    try {
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete the task.'); // Set a generic error message
    }
  };

  return (
    <div className="todoListApp">
      <h1>To-Do List</h1>
      {error && <p style={{color: 'red'}}>{error}</p>} {/* Display error message */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompleted(task.js)}
            />
            {task.text}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoListApp;