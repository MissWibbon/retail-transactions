import './App.css';
import React, { useState, useEffect } from 'react'
import { conversionsJanFebMarch } from './data/retail-converstions_jan-march_2020';
import axios from 'axios';



function App(props) {
  const [loading, setLoading] = useState(false);
  const [conversions, setConversions] = useState([]);
  const distinct = []
  const [customers, setCustomers] = useState({})
  const key = 'Name';

  
  useEffect(() => {
    const loadPost = async () => {
      
      // Till the data is fetch using API 
      // the Loading page will show.
      setLoading(true);
      const arrayUniqueByKey = [...new Map(conversionsJanFebMarch.map(item =>
        [item[key], item])).values()];

        // Await make wait until that 
        // promise settles and return its reult
        const response = await axios.get(conversionsJanFebMarch);

        // After fetching data stored it in posts state.
        setConversions(response.data);

        // Closed the loading page
        setLoading(false);
    }

    // Call the function
    loadPost();
}, []);
  return (
    <div className="App">
        {loading ? (
          <h4>Loading...</h4>) :
          (conversions.map((item) =>
              // Presently we only fetch 
              // title from the API 
              <h4>{item.Name}</h4>)
          )
      }
    </div>
  );
}

export default App;
