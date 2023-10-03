import React, { useEffect } from "react";
const Report = (props) => {
    const { signedReportsRequest } = props;

    useEffect(() => {
        const script = document.createElement("script")
        script.src ="https://reports.learnosity.com"
        script.async = true
        script.onload = () => {
            const callbacks = {
                errorListener: function (e) {
                    // Adds a listener to all error codes.
                    console.log("window.LearnosityReports", window.LearnosityReports)
                    console.log("window.reportsApp", window.reportsApp)
                    console.log("Error Code ", e.code);
                    console.log("Error Message ", e.msg);
                    console.log("Error Detail ", e.detail);
                },
                readyListener: function () {
                    console.log("Learnosity Reports API is ready");
                    console.log("window.reportsApp", window.reportsApp)
                },
            };
            // reportsApp = ref.current
            window.reportsApp = window.LearnosityReports.init(
                signedReportsRequest,
                callbacks
            );
        }
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    });

    return (
        <div className="report mt-4">
            <p className="text-center"><span className="text-center rounded-lg p-3 mx-3 bg-teal-400">Reports API</span>Let's see how you did on that assessment!</p>
            <div className="shadow-lg p-4">
                <div id="sessions-summary"></div>
            </div>
            <div className="shadow-lg p-4">
                <div id="session-detail"></div>
            </div>
        </div>
    );
};
export default Report;
