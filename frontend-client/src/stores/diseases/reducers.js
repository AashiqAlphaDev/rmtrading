import {
	QUERY_DISEASES,
	QUERY_DISEASES_SUCCEDED,
	QUERY_DISEASES_FAILED, REQUEST_ADD_DISEASE, ADD_DISEASE_SUCCEDED, DISEASE_CLEAR_MATCHES
} from "./actions";

const initDiseaseData = {
	list: []
};

function diseaseReducer(state = initDiseaseData, action) {
	switch (action.type) {
		case DISEASE_CLEAR_MATCHES:{
			state = {...state, addedDisease:null};
			break;
		}
		case QUERY_DISEASES_SUCCEDED: {
			state = {...state, list: action.payload, fetchError: null, isQueryInProgress: false};
			break;
		}
		case QUERY_DISEASES_FAILED: {
			state = {...state, fetchError: action.payload, isQueryInProgress: false};
			break;
		}
		case QUERY_DISEASES: {
			state = {...state, fetchError: null, isQueryInProgress: true};
			break;
		}
		case ADD_DISEASE_SUCCEDED:{
			state = {...state, addedDisease:action.payload};
			break;
		}
		default: {
			break;
		}
	}
	return state;
}

export default diseaseReducer;