import React, { useEffect } from "react";
const Report = React.forwardRef((props, learnosityApiRef) => {
    const { signedReportsRequest } = props;

    useEffect(() => {
        const callbacks = {
            errorListener: function (e) {
                // Adds a listener to all error codes.
                console.log("Error Code ", e.code);
                console.log("Error Message ", e.msg);
                console.log("Error Detail ", e.detail);
            },

            readyListener: function () {
                console.log("Learnosity Reports API is ready");

                console.log("learnosityApiRef", learnosityApiRef);
            },
        };
        learnosityApiRef.current = window.LearnosityReports.init(
            signedReportsRequest,
            callbacks
        );
    }, [signedReportsRequest]);

    return (
        <div className="report">
            <p>REPORT COMPONENT</p>
            <div id="session-detail"></div>
        </div>
    );
});
export default Report;
