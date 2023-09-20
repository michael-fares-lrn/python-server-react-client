import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/members")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log("data", data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="App">
            {loading ? (
                <p>LOADING...</p>
            ) : (
                data.members.map((member, i) => {
                    return <p key={i}>{`The member is: ${member}`}</p>;
                })
            )}
        </div>
    );
}

export default App;
