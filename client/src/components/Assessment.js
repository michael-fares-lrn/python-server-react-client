import React, { useEffect } from "react";
const Assessment = React.forwardRef((props, learnosityApiRef) => {
    const { signedItemsRequest, setSubmitted } = props;

    useEffect(() => {
        const callbacks = {
            errorListener: function (e) {
                // Adds a listener to all error codes.
                console.log("Error Code ", e.code);
                console.log("Error Message ", e.msg);
                console.log("Error Detail ", e.detail);
            },

            readyListener: function () {
                console.log("Learnosity Items API is ready");

                console.log("learnosityApiRef", learnosityApiRef);

                learnosityApiRef.current.on("test:finished:submit", () => {
                    console.log("test:finished:submit FIRED");
                    setSubmitted(true);
                });
            },
        };
        learnosityApiRef.current = window.LearnosityItems.init(
            signedItemsRequest,
            callbacks
        );
    }, [signedItemsRequest]);

    return (
        <div className="assessment mt-4">
            <p className="text-center">
            <span className="text-center rounded-lg p-3 mx-3 bg-teal-400">Items API</span>
                Take your assessment here:</p>
            <div id="learnosity_assess" className="shadow-lg p-4"></div>
        </div>
    );
});
export default Assessment;
