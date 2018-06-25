import {CLEAR_VISIT, QUERY_VISITS_SUCCEDED,	REQUEST_ADD_BIOMETRIC,
	ADD_BIOMETRIC_SUCCEDED,
	ADD_BIOMETRIC_FAILED} from "./actions";
import {ADD_VISIT_SUCCEDED} from "../pet-types/actions";

const visitsInitData = {
	list: []
};

function visitReducer(state = visitsInitData, action) {
	switch (action.type) {
		case QUERY_VISITS_SUCCEDED: {
			state = {...state, list: action.payload};
			break;
		}
		case REQUEST_ADD_BIOMETRIC :{
			state={...state ,addingBiometricInProgreess:true};
			break;
		}
		case ADD_BIOMETRIC_SUCCEDED :{
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
		case ADD_VISIT_SUCCEDED:{
			state = {...action.payload};
			break;
		}
	}
	return state;
}

export {visitReducer, visitDetailReducer};