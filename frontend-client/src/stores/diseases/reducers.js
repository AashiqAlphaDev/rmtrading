import {
	QUERY_DISEASES,
	QUERY_DISEASES_SUCCEDED,
	QUERY_DISEASES_FAILED} from "./actions";

const initDiseaseData = {
	list:[]
};

function diseaseReducer(state = initDiseaseData, action) {
	switch (action.type) {
		case QUERY_DISEASES_SUCCEDED:{
			state = {...state, list:action.payload, fetchError:null, isQueryInProgress:false};
			break;
		}
		case QUERY_DISEASES_FAILED:{
			state = {...state, fetchError:action.payload, isQueryInProgress:false};
			break;
		}
		case QUERY_DISEASES:{
			state = {...state, fetchError:null, isQueryInProgress:true};
			break;
		}
		default:{
			break;
		}
	}
	return state;
}

export default diseaseReducer;