import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Assessment from "./components/Assessment";
import Report from "./components/Report";
import Author from "./components/Author";

function App() {
    const [signedAuthorRequest, setSignedAuthorRequest] = useState({});
    const [signedItemsRequest, setSignedItemsRequest] = useState({});
    const [signedReportsRequest, setSignedReportsRequest] = useState({});
    const [loading, setLoading] = useState(true);
    const [authored, setAuthored] = useState(false);
    const [activityReference, setActivityReference] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [sessionId, setSessionId] = useState("");

    /** controls which Learnosity frontend API is being used */
    const learnosityApiRef = useRef(null);

    useEffect(() => {
        fetch("/author")
            .then((res) => res.json())
            .then((data) => {
                setSignedAuthorRequest(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!authored) {
            return;
        }
        learnosityApiRef.current = null;
        setLoading(true)
        fetch(`/assessment?activity=${activityReference}`)
            .then((res) => res.json())
            .then((data) => {
                setSignedItemsRequest(data);
                setLoading(false);
                setSessionId(data.request.session_id);
            });
    }, [authored]);

    useEffect(() => {
        if (!submitted) {
            return;
        }
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
            {!loading && !authored && (
                <Author
                    signedAuthorRequest={signedAuthorRequest}
                    setActivityReference={setActivityReference}
                    setAuthored={setAuthored}
                    ref={learnosityApiRef}
                />
            )}
            {!submitted && authored && (
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
