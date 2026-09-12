import { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  // Memory box for the list of items
  const [items, setItems] = useState([]);
  // Memory box to know if we are still loading
  const [loading, setLoading] = useState(true);
  // Memory box for any error message
  const [error, setError] = useState(null);

  // This runs automatically when the page first opens
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Show a loading message while waiting
  if (loading) {
    return (
      <div className="home">
        <h1>Fabricated Items</h1>
        <p>Loading items...</p>
      </div>
    );
  }

  // Show an error if something went wrong
  if (error) {
    return (
      <div className="home">
        <h1>Fabricated Items</h1>
        <p className="error">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="home">
      <h1>Fabricated Items</h1>

      {items.length === 0 ? (
        <p>No fabricated items yet. The admin can add some later.</p>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item._id} className="item-card">
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <p className="category">{item.category}</p>
              <p className="description">{item.description}</p>
              <p className="price">KSh {item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;