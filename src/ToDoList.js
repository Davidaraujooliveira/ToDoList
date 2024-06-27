import React, { useState, useCallback } from 'react';

function Tasks({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const removeTask = useCallback((index) => {
    setTasks(currentTasks => {
      const newTasks = [...currentTasks.filter((_, i) => i !== index)];
      console.log(`Task removed at index ${index}. Updated tasks count: ${newTasks.length}.`);
      return newTasks;
    });
  }, []); // No dependencies

  const addTask = useCallback(() => {
    if (!newTask.trim()) return; // Prevent adding empty tasks
    setTasks(currentTasks => [...currentTasks, { description: newTask }]);
    console.log(`New task added. Total tasks count: ${tasks.length + 1}.`);
    setNewTask(''); // Reset input field after adding
  }, [newTask, tasks.length]); // Dependencies

  const editTask = useCallback((index, newDescription) => {
    setTasks(currentTasks => currentTasks.map((task, i) => 
      i === index ? { ...task, description: newDescription } : task
    ));
    console.log(`Task at index ${index} updated.`);
  }, []); // No dependencies

  const handleTaskChange = useCallback((event) => {
    setNewTempTask(event.target.value);
  }, []); // Event handlers are typically memoized without dependencies

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
          <li key={index}> {/* Consider using a unique id instead of index for keys */}
            <input
              type="text"
              value={task.description}
              onChange={(e) => editTask(index, e.target._value)}
            />
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Tasks;