import React, { useState, useEffect } from 'react';

const taskQueue = [];
let isBatchUpdateScheduled = false;

function TaskForm({ addTask }) {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    const newTask = { taskName: task, priority };
    queueTask(newTask);
    setTask('');
    setFeedback(`Task "${task}" queued with ${priority} priority`);
    setTimeout(() => setFeedback(''), 4000); // Feedback disappears after 4 seconds
  };

  function queueTask(newTask) {
    taskQueue.push(newTask);
    if (!isBatchUpdateScheduled) {
      isBatchUpdateScheduled = true;
      setTimeout(() => {
        processTaskQueue();
        // We keep scheduling as long as there is a task in queue
        if (taskQueue.length > 0) setTimeout(() => processTaskQueue(), 2000);
        else isBatchUpdateScheduled = false;
      }, 2000);
    }
  }

  function processTaskQueue() {
    while (taskQueue.length > 0) {
      const { taskName, priority } = taskQueue.shift();
      addTask(`${taskName} (${priority})`);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskInput">Task Description</label>
        <input
          id="taskInput"
          type="text"
          value={task}
          onChange={handleChange}
          placeholder="Enter your task here..."
        />
        <label htmlFor="prioritySelect">Priority</label>
        <select
          id="prioritySelect"
          value={priority}
          onChange={handlePriorityChange}
        >
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      {feedback && <p>{feedback}</p>}
    </>
  );
}

export default TaskPrimary;