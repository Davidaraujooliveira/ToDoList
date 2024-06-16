import React, { useState } from 'react';

function TodoListApp() {
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState(''); // State for error messages

  // Function to add a new task
  const addTask = (e) => {
    e.preventDefault(); 

    try {
      // Validation to ensure task is not empty
      if (!newTask.trim()) {
        throw new Error('Task cannot be empty.'); // If empty, throw an error
      }
      // Adding a new task to the list
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
      setError(''); // Resetting error message on successful addition
    } catch (err) {
      // Catch and set the error message
      setError(`Adding Task Failed: ${err.message}`);
    }
  };

  // Function to toggle the completion status of a task
  const toggleTaskCompleted = (id) => {
    try {
      // Update task completion status
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    } catch (err) {
      // Set error message in case of failure
      setError('Toggling Task Status Failed.');
    }
  };

  // Function to delete a task
  const deleteTask = (id) => {
    try {
      // Filter out the task to be deleted
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      // Set error message in case of failure
      setError('Deleting Task Failed.');
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
              onChange={() => toggleTaskCompleted(task.id)} // Fixed the bug here, now correctly referencing task.id
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