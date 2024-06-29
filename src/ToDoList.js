import React, { useState, useCallback } from 'react';

function Tasks({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const removeTask = useCallback((index) => {
    setTasks(currentTasks => {
      const updatedTasks = currentTasks.filter((_, i) => i !== index);
      console.log(`Task removed at index ${index}. Updated tasks count: ${updatedTasks.length}.`);
      return updatedTasks;
    });
  }, []);

  const addTask = useCallback(() => {
    if (!newTask.trim()) return;
    setTasks(currentTasks => [
      ...currentTasks,
      { description: newTask },
    ]);
    console.log(`New task added. Total tasks count: ${tasks.length + 1}.`);
    setNewTask('');
  }, [newTask, tasks.length]);

  const editTask = useCallback((index, newDescription) => {
    setTasks(currentTasks => 
      currentTasks.map((task, i) => 
        i === index ? { ...task, description: newDescription } : task
      )
    );
    console.log(`Task at index ${index} updated.`);
  }, []);

  const handleNewTaskChange = useCallback((event) => {
    setNewTask(event.target.value);
  }, []);

  return (
    <>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
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
            <button onClick={() => removeMatch(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Tasks;