import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function ToDoApp() {
  const [toDoItems, setToDoItems] = useState([]);

  const handleAddToDoItem = (item) => {
    try {
      setToDoItems(prevItems => [...prevItems, item]);
    } catch (error) {
      console.error('Failed to add item: ', error);
    }
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
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    try {
      onAdd(inputValue);
      setInputValue('');
    } catch (error) {
      console.error('Failed to add new todo item: ', error);
    }
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
  </React.StrictSubmode>,
  document.getElementById('root')
);

export default ToDoApp;