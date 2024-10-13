import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:5000/items');
    setItems(response.data);
  };

  const addItem = async () => {
    await axios.post('http://localhost:5000/items', { name });
    setName('');
    fetchItems();
  };

  const updateItem = async (id) => {
    const newName = prompt('Enter new name:');
    await axios.put(`http://localhost:5000/items/${id}`, { name: newName });
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`);
    fetchItems();
  };

  return (
    <div>
      <h1>Items</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add item"
      />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map(item => (
          // Inside your map function for rendering list items
          <li key={item.id}>
            {item.name}
            <div className="button-group">
              <button className="edit" onClick={() => updateItem(item.id)}>Edit</button>
              <button className="delete" onClick={() => deleteItem(item.id)}>Delete</button>
            </div>
          </li>

        ))}
      </ul>
    </div>
  );
};

export default App;
