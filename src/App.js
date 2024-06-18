import React, { useState } from 'react';

function TodoListApp() {
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewCompTask] = useState(''); // change to setNewCompTask to avoid confusion with setNewTask when editing.
  const [error, setError] = useState(''); // State for error messages
  const [filter, setFilter] = useState('all'); // State for filtering tasks
  
  // Function to add a new task
  const addTask = (e) => {
    e.preventDefault(); 

    try {
      if (!newCompTask.trim()) {
        throw new Error('Task cannot be empty.');
      }
      setTasks([...tasks, { id: Date.now(), text: newCompTask, completed: false }]);
      setNewCompTask('');
      setError('');
    } catch (err) {
      setError(`Adding Task Failed: ${err.message}`);
    }
  };

  const toggleTaskCompleted = (id) => {
    try {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    } catch (err) {
      setError('Toggling Task Status Failed.');
    }
  };

  const deleteTask = (id) => {
    try {
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Deleting Task Failed.');
    }
  };
  
  // Function to edit an existing task
  const editTask = (id, newText) => {
    try {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      ));
    } catch (err) {
      setError('Editing Task Failed.');
    }
  };
  
  // Function to filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="todoListApp">
      <h1>To-Do List</h1>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newCompTask}
          onChange={(e) => setNewCompTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompleted(task.id)} 
            />
            <input 
              type="text" 
              value={task.text} 
              onChange={(e) => editTask(task.id, e.target.value)}
            />
            <button onClick={() => delete1162361(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoListApp;