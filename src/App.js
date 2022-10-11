import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [zip, setZip] = useState('93117');
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('/.netlify/functions/cat-endpoint');
      const data = await resp.json();
      setQuotes(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchYelp = async () => {
      const resp = await fetch(`/.netlify/functions/yelp?zip=${zip}`);
      const data = await resp.json();
      setRestaurants(data);
    };
    fetchYelp();
  }, []);

  const searchRestaurants = async () => {
    console.log(zip);
    const resp = await fetch(`/.netlify/functions/yelp?zip=${zip}`);
    const data = await resp.json();
    setRestaurants(data);
    // call the API with the zip
    // set the restaurants in state
  };

  // This will fail because of CORS

  // useEffect(() => {
  //   const fetchYelp = async () => {
  //     const resp = await fetch(
  //       `https://api.yelp.com/v3/businesses/search?categories=restaurants&location=93117`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
  //         },
  //       }
  //     );
  //     const data = await resp.json();
  //     setRestaurants(data);
  //   };
  //   fetchYelp();
  // }, []);
  return (
    <div className="App">
      <input value={zip} onChange={(e) => setZip(e.target.value)} />
      <button onClick={searchRestaurants}>Search</button>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>{restaurant.name}</div>
      ))}
    </div>
  );
}

export default App;
