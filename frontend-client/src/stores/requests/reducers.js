import {
    REQUEST_ADD_REQUEST,
    ADD_REQUEST_SUCCEDED,
    ADD_REQUEST_FAILED
} from "./actions";

const initDiseaseData = {
	list: []
};

function requestReducer(state = initDiseaseData, action) {
	switch (action.type) {
        case REQUEST_ADD_REQUEST: {
            state = {...state, addingRequestInProgress: true};
            break;
        }
        case ADD_REQUEST_SUCCEDED: {
            state = {...state, addedRequest: action.payload, addingRequestInProgress: false};
            break;
        }
        case ADD_REQUEST_FAILED: {
            state = {...state, addedRequest: action.payload, addingRequestInProgress: false};
            break;
        }
		default: {
			break;
		}
	}
	return state;
}

export default requestReducer;