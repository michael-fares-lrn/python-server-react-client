import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Assessment from "./components/Assessment";
import Report from "./components/Report";

function App() {
    const [signedItemsRequest, setSignedItemsRequest] = useState({});
    const [signedReportsRequest, setSignedReportsRequest] = useState({});
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

    useEffect(() => {
        learnosityApiRef.current = null;
        setLoading(true);
        fetch(`/report?session_id=${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                setSignedReportsRequest(data);
                setLoading(false);
            });
    }, [submitted]);

    return (
        <div className="App font-sans container mx-auto px-4">
            {loading && <p className="text-center">LOADING...</p>}
            {!submitted && (
                <Assessment 
                    sessionId={sessionId}
                    signedItemsRequest={signedItemsRequest}
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                    ref={learnosityApiRef}
                />
            )}
            {submitted && signedReportsRequest && !loading && (
                <Report
                    sessionId={sessionId}
                    signedReportsRequest={signedReportsRequest}
                    ref={learnosityApiRef}
                />
            )}
        </div>
    );
}

export default App;
