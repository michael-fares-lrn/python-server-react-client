import React, { useEffect, useState } from "react";

const Author = (props) => {
    const { signedAuthorRequest, setAuthored, setActivityReference } = props;
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://authorapi.learnosity.com";
        script.async = true;
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
                    console.log("window.authorApp", window.authorApp)


                    // prevent save if no items:
                    window.authorApp.on("save:activity", function (e) {
                        const noItems =
                            window.authorApp.getActivity().data.items
                                .length === 0;
                        if (noItems) {
                            alert(
                                "Please add items before you save the activity!"
                            );
                            e.preventDefault();
                        } else {
                            console.log("the activity was saved!!");
                            setIsSaved(true);
                            setActivityReference(window.authorApp.getActivity().reference)
                        }
                    });
                },
            };
            // itemsApp = ref.current
            window.authorApp = window.LearnosityAuthor.init(
                signedAuthorRequest,
                callbacks
            );
        };
        document.body.appendChild(script);
       

        return () => {
            document.body.removeChild(script);
        };
    }, [signedAuthorRequest]);

    return (
        <div className="author mt-4">
            <p className="text-center">
                <span className="text-center rounded-lg p-3 mx-3 bg-teal-400">
                    Author API
                </span>
                Author your assessment here, when finished, press the button to
                take the assessment:
            </p>
            <div className="flex justify-center">
                <button
                    className="text-white bg-blue-500 hover:bg-blue-600 active:bg-blue:700 rounded-lg p-3 mx-3 mt-5 disabled:opacity-40"
                    disabled={!isSaved}
                    onClick={() => {
                      setAuthored(true);
                      window.authorApp.destroy()
                    }}
                >
                    Take this Assessment!
                </button>
            </div>
            <div id="learnosity-author" className="shadow-xl p-4"></div>
        </div>
    );
};
export default Author;
