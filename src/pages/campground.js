import { useEffect ,useState} from 'react';
import axios from 'axios';
import {
    useParams
  } from "react-router-dom";

export default function CampGround(){
    const [data, setData] = useState([]);
    let { id } = useParams();
    useEffect(() => {
      axios.get(`http://localhost:8000/getOneRecord/${id}`)
        .then(response => {
            console.log(response.data)
          setData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    return (
      <div>
        <h1>Detail</h1>
        <p>{data.title}</p>
      </div>
    );
}
