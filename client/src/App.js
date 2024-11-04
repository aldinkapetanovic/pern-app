import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedFileData, setUploadedFileData] = useState(null); // State for uploaded file metadata

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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setUploadedFileData(response.data.metadata); // Store uploaded file metadata
      setFile(null); // Clear file input
    } catch (error) {
      setMessage('Error uploading file: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Items</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress}
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

      <h2>Upload File</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}

      {uploadedFileData && (
        <div>
          <h3>Uploaded File Metadata</h3>
          <p><strong>Name:</strong> {uploadedFileData.name}</p>
          <p><strong>Path:</strong> {uploadedFileData.path}</p>
          <p><strong>Size:</strong> {uploadedFileData.size} bytes</p>
          <p><strong>MIME Type:</strong> {uploadedFileData.mimeType}</p>
          <p><strong>Upload Date:</strong> {new Date(uploadedFileData.uploadDate).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default App;
