import React, { useEffect } from "react";
const Assessment = React.forwardRef((props, learnosityApiRef) => {
    const { signedItemsRequest, setSubmitted } = props;

    useEffect(() => {
        const init = window.LearnosityItems.init(signedItemsRequest, {
            errorListener: function (e) {
            // Adds a listener to all error codes.
            console.log("Error Code ", e.code);
            console.log("Error Message ", e.msg);
            console.log("Error Detail ", e.detail);
        },

        readyListener: function () {
            console.log("Learnosity Items API is ready");

            console.log("learnosityApiRef", learnosityApiRef)
            
            learnosityApiRef.current.on("test:finished:submit", () => {
                console.log("test:finished:submit FIRED")
                setSubmitted(true)
            })

            Object.keys(learnosityApiRef.current.questions()).forEach(resp_id => {
                const question = learnosityApiRef.current.question(resp_id);
                question.on('validated', () => {
                    console.log(resp_id, "validated")
                   question.disable()
                })
            })
            
        }
    }) 
    learnosityApiRef.current = init;     
  }, [signedItemsRequest])

    return (
        <>
            <p>ASSESSMENT COMPONENT!</p>
            <button
                onClick={() => {
                    learnosityApiRef.current.getCurrentItem().questions.forEach(q => {
                        learnosityApiRef.current.questionsApp().question(q.response_id).validate()
                    })
                }}
            >PRESS ME TO CHECK THE ANSWER AND DISABLE THE QUESTION</button>
            <div id="learnosity_assess"></div>
        </>
    );
});
export default Assessment;
