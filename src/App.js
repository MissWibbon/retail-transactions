import './App.css';
import React, { useState, useEffect } from 'react'


function App(props) {
  const [loading, setLoading] = useState(false);
  const [conversions, setConversions] = useState([]);
  const distinct = []
  const [customers, setCustomers] = useState({})
  const key = 'Name';

  
  useEffect(() => {
    const loadPost = async () => {
      //console.log(conversionsJanFebMarch)
      // Till the data is fetch using API 
      // the Loading page will show.
      setLoading(true);

        // Await make wait until that 
        // promise settles and return its reult
        async function initProducts() {
          await fetch(`http://127.0.0.1:3000/conversions`)
              .then(response => response.json())
              .then(response => {
                  setConversions(response.result);
                  console.log(response.result);
              })
              .catch(err => console.error(err));
      }


        // After fetching data stored it in posts state.
        //setConversions(response.data);

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
          (
          <div>loaded</div>
          )
      }
    </div>
  );
}

export default App;
