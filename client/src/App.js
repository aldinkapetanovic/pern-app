import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  // const serverUrl = process.env.REACT_APP_SERVER_URL || '';

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get(`/api/items`);
    setItems(response.data);
  };

  const addItem = async () => {
    if (!name.trim()) return; // Prevent adding empty items
    await axios.post(`/api/items`, { name });
    setName('');
    fetchItems();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addItem();
    }
  };

  const updateItem = async (id) => {
    const newName = prompt('Enter new name:');
    if (newName) {
      await axios.put(`/api/items/${id}`, { name: newName });
      fetchItems();
    }
  };

  const deleteItem = async (id) => {
    await axios.delete(`/api/items/${id}`);
    fetchItems();
  };

  return (
    <div>
      <h1>Items</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress} // Add this line
        placeholder="Add item"
      />
      <button className="add" onClick={addItem}>Add</button>
      <ul>
        {items.map(item => (
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
