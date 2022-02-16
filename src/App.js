import './App.css';
import React, { useState, useEffect } from 'react'


function App(props) {
  const [loading, setLoading] = useState(false);
  const [conversions, setConversions] = useState([]);
  const [customers, setCustomers] = useState([])
  const [history, setHistory] = useState([])
  const [custPoints, setCustPoints] = useState([])
  useEffect(() => {
    const loadPost = async () => {
      //console.log(conversionsJanFebMarch)
      // Till the data is fetch using API 
      // the Loading page will show.
      setLoading(true);

      // function to sum total spending
      function sum(obj) {
        var sum = 0;
        for (var el in obj) {
          if (obj.hasOwnProperty(el)) {
            sum += parseFloat(obj[el]);
          }
        }
        return sum;
      }

      // Await make wait until that 
      // promise settles and return its reult
      var getJSON = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
          var status = xhr.status;
          if (status === 200) {
            callback(null, xhr.response);
          } else {
            callback(status, xhr.response);
          }
        };
        xhr.send();
      };
      getJSON('https://v1.nocodeapi.com/mwuebben/google_sheets/WoXCAYgBorCCCsgm?tabId=Sheet1',
        function (err, data) {
          if (err !== null) {
            console.log('Something went wrong: ' + err);
          } else {
            setConversions(data.data)
            var unique = [];
            var distinct = [];
            for (let i = 0; i < conversions.length; i++) {
              if (!unique[conversions[i].Name]) {
                distinct.push({ name: conversions[i].Name, id: conversions[i].row_id });
                unique[conversions[i].Name] = 1;
              }
            }
            setCustomers(distinct)
            var shop = [];
            let people = []
            customers.map((e) => {
              let name = e.name
              const arr = conversions.filter(function (transact) {
                return transact.Name === name
              })
              for (let i = 0; i < arr.length; i++) {
                let prices = []
                //prices.push(conversions[i]["Total Price"])
                //console.log(prices)
                if (!unique[conversions[i].Name]) {
                  distinct.push({ name: conversions[i].Name, id: conversions[i].row_id });
                  unique[conversions[i].Name] = 1;
                }
              }
              shop.push(arr)
              setHistory(shop)
              console.log(history)
              history.forEach(element => {
                let points = 0;
                let prices = []
                for (let i = 0; i < element.length; i++) {
                  let split = element[i]["Total Price"].split(" $ ").pop()
                  let price = Number(split, 10)
                  if (price > 50 && price < 100) {
                    let dif = 100 - price
                    points = points + dif
                  } else if (price > 100) {
                    let dif = price - 100
                    points = (dif * 2) + dif
                  }
                  prices.push(price)
                }
                var person = {
                  customer: {
                    "Name": element[0].Name,
                    "Purchases": element.length,
                    "Points": Math.round(points),
                    "Total Price": sum(prices).toFixed(2)
                  }
                }
                people.push(person)
              });
              setCustPoints(people)
              custPoints.map(customer =>{
                console.log(customer.customer)
              })
            })
          }
        });
        
        
        // After fetching data stored it in posts state.
        //setConversions(response.data);
        
        // Closed the loading page
        console.log(custPoints)
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
          <>
            <h1>Retail Conversion</h1>
            <h2>Jan-March 2020</h2>
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Purchases</th>
                  <th>Points</th>
                  <th>Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {custPoints.map(customer =>
                (
                  <tr key={customer.row_id}>
                    <th {...props} data={customer}>{customer.customer.Name}</th>
                    <th>{customer.customer.Purchases}</th>
                    <th>{customer.customer.Points}</th>
                    <th>${customer.customer["Total Price"]}</th>
                  </tr>
                )

                )
                }
              </tbody>
            </table>
          </>
        )
      }
    </div>
  );
}

export default App;
