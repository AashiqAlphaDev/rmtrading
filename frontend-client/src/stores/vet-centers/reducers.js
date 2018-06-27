import {
	QUERY_VET_CENTERS,
	QUERY_VET_CENTERS_SUCCEEDED,
	QUERY_VET_CENTERS_FAILED,
	REQUEST_VET_CENTER_FETCH,
	VET_CENTER_FETCH_SUCCEEDED,
	VET_CENTER_FETCH_FAILED,
	ADMINS_FETCH_SUCCEEDED,
	ADD_ADMIN_SUCCEEDED,
	QUEUES_FETCH_SUCCEEDED,
	ADD_QUEUE_SUCCEEDED,
	ADD_VET_CENTER_SUCCEEDED,
	CLEAR_VET_CENTER,
} from "./actions";

const initVetCenterData = {
	centers: [],
	vaccinationCenterAdded: false
};

function vetCenterReducer(state = initVetCenterData, action) {
	switch (action.type) {
		case CLEAR_VET_CENTER: {
			state = {...state, vaccinationCenterAdded: false};
			break;
		}
		case QUERY_VET_CENTERS_SUCCEEDED: {
			state = {...state, centers: action.payload.docs, fetchError: null, isQueryInProgress: false};
			break;
		}
		case QUERY_VET_CENTERS_FAILED: {
			state = {...state, fetchError: action.payload, isQueryInProgress: false};
			break;
		}
		case ADD_VET_CENTER_SUCCEEDED: {
			state = {...state, vaccinationCenterAdded: true}
			break;
		}
		case QUERY_VET_CENTERS: {
			state = {...state, fetchError: null, isQueryInProgress: true};
			break;
		}
		default: {
			break;
		}
	}
	return state;
}


const initVetCenterDetail = {}

function vetCenterDetailReducer(state = initVetCenterDetail, action) {
	switch (action.type) {
		case REQUEST_VET_CENTER_FETCH: {
			break;
		}
		case VET_CENTER_FETCH_SUCCEEDED: {
			state = {...state, ...action.payload};
			break;
		}
		case VET_CENTER_FETCH_FAILED: {
			break;
		}
		case ADMINS_FETCH_SUCCEEDED: {
			state = {...state, admins: action.payload};
			break;
		}
		case ADD_ADMIN_SUCCEEDED: {
			state = {...state, addedAdmin: action.payload};
			break;
		}
		case QUEUES_FETCH_SUCCEEDED: {
			state = {...state, queues: action.payload};
			break;
		}
		case ADD_QUEUE_SUCCEEDED: {
			state = {...state, addedQueue: action.payload};
			break;
		}
		default: {
			break;
		}
	}
	return state;
}


export {vetCenterReducer, vetCenterDetailReducer};