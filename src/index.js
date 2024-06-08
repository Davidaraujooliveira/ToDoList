import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Main ToDo App Component
function ToDoApp() {
  const [toDoItems, setToDoItems] = useState([]);

  // Function to add a new item
  const handleAddToDoItem = (item) => {
    setToDoItems(prevItems => [...prevItems, item]);
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <ToDoList items={toDoItems} />
      <AddToDoItem onAdd={handleAddToDoItem} />
    </div>
  );
}

// ToDo List Component for displaying items
const ToDoList = ({ items }) => (
  <ul>
    {items.map((item, index) => (
      // Use index as key for simplicity; consider using unique ids for dynamic lists
      <li key={index}>{item}</li>
    ))}
  </ul>
);

// Component to add a new ToDo item
const AddToDoSetItem = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // Prevent adding empty entries
    onAdd(inputValue);
    setInputValue(''); // Reset input after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ToDoApp />
  </React.StrictMode>,
  document.getElementById('root')
);

export default ToDoApp;