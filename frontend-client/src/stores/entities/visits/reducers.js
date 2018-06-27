import {CLEAR_VISIT, QUERY_VISITS_SUCCEEDED,	REQUEST_ADD_BIOMETRIC,
	ADD_BIOMETRIC_SUCCEEDED,
	ADD_BIOMETRIC_FAILED} from "./actions";
import {ADD_VISIT_SUCCEEDED} from "../pet-types/actions";

const visitsInitData = {
	list: []
};

function visitReducer(state = visitsInitData, action) {
	switch (action.type) {
		case QUERY_VISITS_SUCCEEDED: {
			state = {...state, list: action.payload};
			break;
		}
		case REQUEST_ADD_BIOMETRIC :{
			state={...state ,addingBiometricInProgreess:true};
			break;
		}
		case ADD_BIOMETRIC_SUCCEEDED :{
			state={...state ,addingBiometricInProgreess:false};
			break;
		}
		case ADD_BIOMETRIC_FAILED :{
			state={...state ,addingBiometricInProgreess:false};
			break;
		}
		default: {
			break;
		}
	}
	return state;
}

const visitDetailInitData = {};

function visitDetailReducer(state = visitDetailInitData, action){
	switch (action.type) {
		case CLEAR_VISIT:{
			state = visitDetailInitData;
			break;
		}
		case ADD_VISIT_SUCCEEDED:{
			state = {...action.payload};
			break;
		}
	}
	return state;
}

export {visitReducer, visitDetailReducer};