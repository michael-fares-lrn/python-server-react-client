import React, { useState, useEffect, useRef } from "react";
import "./App.css";


function App() {
  const [signedItemsRequest, setSignedItemsRequest] = useState({});
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const itemsApp = useRef(null)
  


  useEffect(() => {
      fetch("/assessment")
          .then((res) => res.json())
          .then((data) => {
              setSignedItemsRequest(data);
              console.log("data", data);
              setLoading(false);
              console.log("window.LearnosityItems ?", window.LearnosityItems)
          })
  }, []);

  useEffect(() => {
         itemsApp.current = window.LearnosityItems.init(signedItemsRequest, {
          errorListener: function (e) {
            // Adds a listener to all error codes.
            console.log("Error Code ", e.code);
            console.log("Error Message ", e.msg);
            console.log("Error Detail ", e.detail);
        },

        readyListener: function () {
            console.log("Learnosity Items API is ready");
            console.log("itemsApp", itemsApp)
            itemsApp.current.on("test:start", () => {
                console.log("test:start")
            })
        }
      })      
  }, [signedItemsRequest])

  return (
      <div className="App">
          {loading ? (
              <p>LOADING...</p>
          ) : (
              <>
              <p>Assessment</p>
              <button onClick={() => setCount(count + 1)}>{`<REACT STATE UPDATE TESTING> The count is:  ${count}`}</button>
              <div id="learnosity_assess"></div>
              </>
          )}
      </div>
  );
}

export default App;
