import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Assessment from "./components/Assessment";

function App() {
    const [signedItemsRequest, setSignedItemsRequest] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [sessionId, setSessionId] = useState("");
    /** controls which Learnosity frontend API is being used */
    const learnosityApiRef = useRef(null);

    useEffect(() => {
        fetch("/assessment")
            .then((res) => res.json())
            .then((data) => {
                setSignedItemsRequest(data);
                setLoading(false);
                setSessionId(data.request.session_id);
            });
    }, []);

    return (
        <div className="App">
            {loading ? (
                <p>LOADING...</p>
            ) : (
                <Assessment
                    sessionId={sessionId}
                    signedItemsRequest={signedItemsRequest}
                    ref={learnosityApiRef}
                />
            )}
        </div>
    );
}

export default App;
