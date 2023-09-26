from flask import Flask
from flask import request
# Include server side Learnosity SDK, and set up variables related to user access
from learnosity_sdk.request import Init
from learnosity_sdk.utils import Uuid
import config # Load consumer key and secret from config.py

app = Flask(__name__)

# global security object
security = {
    "consumer_key": config.consumer_key,
    "domain": "localhost",
}

@app.route("/")
def root():
    return "Welcome to my Python Flask API server!"

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

@app.route("/assessment")
def signItemsRequest():
    session_id = Uuid.generate()

    items_request = {
        # Unique student identifier, a UUID generated above.
        "user_id": "$ANONYMIZED_USER_ID",
        # A reference of the Activity to retrieve from the Item bank, defining
        # which Items will be served in this assessment.
        "items": ["Demo3", "Demo4"],
        # Uniquely identifies this specific assessment attempt session for
        # save/resume, data retrieval and reporting purposes. A UUID generated above.
        "session_id": session_id,
        # Used in data retrieval and reporting to compare results
        # with other users submitting the same assessment.
        "activity_id": "quickstart_examples_activity_001",
        # Selects a rendering mode, `assess` type is a "standalone" mode (loading a
        # complete assessment player for navigation, VS `inline`, for embedded).
        "rendering_type": "assess",
        # Selects the context for the student response storage. `submit_practice`
        # mode means student response storage in the Learnosity cloud, for grading.
        "type": "submit_practice",
        # Human-friendly display name to be shown in reporting.
        "name": "Items API Quickstart",
        "config": {
            "regions":"main",
            "configuration": {
                "onsubmit_redirect_url": False
            },
            "labelBundle": {
                "close": "Go to Reporting"
            }
        }
    }
    init = Init("items", security, config.consumer_secret, items_request)
    signedItemsRequest = init.generate()
    return signedItemsRequest

@app.route("/report")
def signReportsRequest():
    # grab the session id from the url query paramater
    session_id = request.args.get("session_id")

    reports_request = {
        "reports": [
           {
            "id": "session-detail",
            "type": "session-detail-by-item",
            "user_id": "$ANONYMIZED_USER_ID",
            # add session_id to the report here
            "session_id": session_id
          }
        ]
    }
    init = Init("reports", security, config.consumer_secret, reports_request)
    signedReportsRequest = init.generate()
    return signedReportsRequest



if __name__ == "__main__":
    app.run(debug=True)