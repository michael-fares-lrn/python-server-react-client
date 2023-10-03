import React, { useState, useEffect } from "react";
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

        setLoading(true);
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
                />
            )}
            {!submitted && signedItemsRequest && authored && (
                <Assessment
                    sessionId={sessionId}
                    signedItemsRequest={signedItemsRequest}
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                />
            )}
            {submitted && signedReportsRequest && !loading && (
                <Report
                    sessionId={sessionId}
                    signedReportsRequest={signedReportsRequest}
                />
            )}
        </div>
    );
}

export default App;
