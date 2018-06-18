import {
	QUERY_VET_CENTERS,
	QUERY_VET_CENTERS_SUCCEDED,
	QUERY_VET_CENTERS_FAILED,
	REQUEST_VET_CENTER_FETCH,
	VET_CENTER_FETCH_SUCCEDED,
	VET_CENTER_FETCH_FAILED,
	CLEAR_VET_CENTER, ADMINS_FETCH_SUCCEDED, ADD_ADMIN_SUCCEDED, QUEUES_FETCH_SUCCEDED, ADD_QUEUE_SUCCEDED,
} from "./actions";

const initVetCenterData = {
	centers:[]
};

function vetCenterReducer(state = initVetCenterData, action) {
	switch (action.type) {
		case QUERY_VET_CENTERS_SUCCEDED:{
			state = {...state, centers:action.payload, fetchError:null, isQueryInProgress:false};
			break;
		}
		case QUERY_VET_CENTERS_FAILED:{
			state = {...state, fetchError:action.payload, isQueryInProgress:false};
			break;
		}
		case QUERY_VET_CENTERS:{
			state = {...state, fetchError:null, isQueryInProgress:true};
			break;
		}
		default:{
			break;
		}
	}
	return state;
}


const initVetCenterDetail={}

function vetCenterDetailReducer(state = initVetCenterDetail, action){
	switch (action.type){
		case REQUEST_VET_CENTER_FETCH:{
			break;
		}
		case VET_CENTER_FETCH_SUCCEDED:{
			state = {...state, ...action.payload};
			break;
		}
		case VET_CENTER_FETCH_FAILED:{
			break;
		}
		case ADMINS_FETCH_SUCCEDED:{
			state = {...state, admins:action.payload};
			break;
		}
		case ADD_ADMIN_SUCCEDED:{
			state = {...state, addedAdmin:action.payload};
			break;
		}
		case QUEUES_FETCH_SUCCEDED:{
			state = {...state, queues:action.payload};
			break;
		}
		case ADD_QUEUE_SUCCEDED:{
			state = {...state, addedQueue:action.payload};
			break;
		}
		default:{
			break;
		}
	}
	return state;
}



export {vetCenterReducer,vetCenterDetailReducer};