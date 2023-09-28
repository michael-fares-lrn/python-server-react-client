import React, { useEffect } from "react";

const Author = React.forwardRef((props, learnosityApiRef) => {

    const { signedAuthorRequest } = props;
    useEffect(() => {
        const script = document.createElement("script")
        script.src ="https://authorapi.learnosity.com"
        script.async = true
        script.onload = () => {
            const callbacks = {
                errorListener: function (e) {
                    // Adds a listener to all error codes.
                    console.log("Error Code ", e.code);
                    console.log("Error Message ", e.msg);
                    console.log("Error Detail ", e.detail);
                },
                readyListener: function () {
                    console.log("Learnosity Author API is ready");
    
                    console.log("learnosityApiRef", learnosityApiRef);
                },
            };
            // itemsApp = ref.current
            learnosityApiRef.current = window.LearnosityAuthor.init(
                signedAuthorRequest,
                callbacks
            );
        }
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    
    }, [signedAuthorRequest]);

    return (
        <div className="author mt-4">
            <p className="text-center">
            <span className="text-center rounded-lg p-3 mx-3 bg-teal-400">Author API</span>
                Author your assessment here:</p>
            <div id="learnosity-author" className="shadow-xl p-4"></div>
        </div>
    );
});
export default Author;
