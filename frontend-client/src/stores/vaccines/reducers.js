import {FAILED_FETCH_VACCINES, FETCHED_VACCINES, QUERY_VACCINES} from "./actions";

const initVetCenterData = {
	centers:[]
};

function vaccinesReducer(state = initVetCenterData, action) {
	switch (action.type) {
		case FETCHED_VACCINES:{
			state = {...state, fetchError:null, centers:action.payload, isQueryInProgress:false};
			break;
		}
		case FAILED_FETCH_VACCINES:{
			state = {...state, fetchError:action.payload, isQueryInProgress:false};
			break;
		}
		case QUERY_VACCINES:{
			state = {...state, fetchError:null, isQueryInProgress:true};
			break;
		}
	}
	return state;
}

export default vaccinesReducer;