import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        axios.get('https://vinoth-backend.vercel.app/api/items')
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, []);

    const addItem = () => {
        axios.post('https://vinoth-backend.vercel.app/api/items', { name: newItem })
            .then(response => setItems([...items, response.data]))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Item List</h1>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add a new item"
            />
            <button onClick={addItem}>Add Item</button>
            <ul>
                {items.map(item => (
                    <li key={item._id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
