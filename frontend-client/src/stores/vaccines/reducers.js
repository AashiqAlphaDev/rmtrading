import {
	QUERY_VACCINES,
	QUERY_VACCINES_SUCCEDED,
	QUERY_VACCINES_FAILED,
	REQUEST_VACCINE_FETCH,
	VACCINE_FETCH_SUCCEDED,
	VACCINE_FETCH_FAILED,
	ADD_DOSAGE_SUCCEDED,
	CLEAR_VACCINES,
} from "./actions";

const initVaccineData = {
	list: [],
	vaccineAdded:false,
};

function vaccineReducer(state = initVaccineData, action) {
	switch (action.type) {
		case CLEAR_VACCINES:{
			state = {...state, vaccineAdded:false};
			break;
		}
		case QUERY_VACCINES_SUCCEDED: {
			state = {...state, list: action.payload.docs, fetchError: null, isQueryInProgress: false, vaccineAdded:true};
			break;
		}
		case QUERY_VACCINES_FAILED: {
			state = {...state, fetchError: action.payload, isQueryInProgress: false};
			break;
		}
		case QUERY_VACCINES: {
			state = {...state, fetchError: null, isQueryInProgress: true};
			break;
		}
		default: {
			break;
		}
	}
	return state;
}


const initVaccineDetail = {}

function vaccineDetailReducer(state = initVaccineDetail, action) {
	switch (action.type) {
		case VACCINE_FETCH_SUCCEDED: {
			state = {...state, ...action.payload};
			break;
		}
		case REQUEST_VACCINE_FETCH: {
			break;
		}
		case VACCINE_FETCH_FAILED: {
			break;
		}
		case ADD_DOSAGE_SUCCEDED: {
			state = {...state, addedDosage: action.payload};
			break;
		}
		default: {
			break;
		}
	}
	return state;
}


export {vaccineReducer, vaccineDetailReducer};