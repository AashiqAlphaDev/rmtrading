import {
	QUERY_VACCINES,
	QUERY_VACCINES_SUCCEDED,
	QUERY_VACCINES_FAILED, REQUEST_VACCINE_FETCH, VACCINE_FETCH_SUCCEDED, VACCINE_FETCH_FAILED,
} from "./actions";

const initVaccineData = {
	list:[]
};

function vaccineReducer(state = initVaccineData, action) {
	switch (action.type) {
		case QUERY_VACCINES_SUCCEDED:{
			state = {...state, list:action.payload, fetchError:null, isQueryInProgress:false};
			break;
		}
		case QUERY_VACCINES_FAILED:{
			state = {...state, fetchError:action.payload, isQueryInProgress:false};
			break;
		}
		case QUERY_VACCINES:{
			state = {...state, fetchError:null, isQueryInProgress:true};
			break;
		}
		default:{
			break;
		}
	}
	return state;
}


const initVaccineDetail={}

function vaccineDetailReducer(state = initVaccineDetail, action){
	switch (action){
		case REQUEST_VACCINE_FETCH:{
			break;
		}
		case VACCINE_FETCH_SUCCEDED:{
			state = action.payload;
			break;
		}
		case VACCINE_FETCH_FAILED:{
			break;
		}
		default:{
			break;
		}
	}
	return state;
}



export {vaccineReducer,vaccineDetailReducer};