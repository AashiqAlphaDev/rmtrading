import {FAILED_FETCH_VET_CENTERS, FETCHED_VET_CENTERS, QUERY_VET_CENTERS} from "./actions";

const initVetCenterData = {
	centers:[]
};

function vetCenterReducer(state = initVetCenterData, action) {
	console.log(action)
	switch (action.type) {
		case FETCHED_VET_CENTERS:{
			state = {...state, centers:action.payload, fetchError:null, isQueryInProgress:false};
			break;
		}
		case FAILED_FETCH_VET_CENTERS:{
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

export default vetCenterReducer;