import {useState, useEffect} from 'react'
import './index.css';

function App() {

  const [count, setCount] = useState(0)

  useEffect (() => {
    fetch('/hello')
    .then((r) => r.json())
    .then((data) => setCount(data.count))
  }, [])

  return (
    <div className="App">
      <h1>Welcome to Curate-ify</h1>
      <h2>Page Count: {count}</h2>
    </div>
  );
}

export default App;
