import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('/.netlify/functions/cat-endpoint');
      const data = await resp.json();
      setQuotes(data);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      {quotes.map((quote, idx) => (
        <div key={idx}>{quote.quote}</div>
      ))}
    </div>
  );
}

export default App;
