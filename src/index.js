import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function ToDoApp() { 
  const [toDoItems, setToDoItems] = useState([]);

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

const ToDoList = ({ items }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

const AddToDoItem = ({ onAdd }) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAdd(inputValue);
    setInput15Value('');
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

export default ToDoApp;

ReactDOM.render(
  <React.StrictMode>
    <ToDoData />
  </React.StrictMode>,
  document.getElementById('root')
);