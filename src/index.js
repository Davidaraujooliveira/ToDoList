import React from 'react';

function ToDoApp() { 
  const [toDoItems, setToDoItems] = React.useState([]);

  const handleAddToDoItem = (item) => { 
    setToDoItems([...toDoItems, item]);
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <ToDoList items={toDoItems} />
      <AddToDoItem onAdd={handleAddToDoItem} />
    </div>
  );
}

export default ToDoApp;

import React from 'react';
import ReactDOM from 'react-dom';
import ToDoApp from './ToDoApp';

ReactDOM.render(
  <React.StrictMode>
    <ToDoApp />
  </React.StrictMode>,
  document.getElementById('root')
);