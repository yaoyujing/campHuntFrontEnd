import { useEffect ,useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/data')
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

 
  return (
    <div>
      <h1>Data from the Backend:</h1>
      <p>Message from the server: {data}</p>
      
    </div>
  );
}

export default App;
