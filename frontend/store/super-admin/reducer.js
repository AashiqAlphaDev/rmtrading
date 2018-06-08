import {SUPER_SIGN_OUT_REQUESTED, SUPER_SIGN_OUT_FAILED, SUPER_SIGN_OUT_SUCCEEDED} from "./auth-actions";
import {
	DISEASES_CLEAR_MATCHES,
	DISEASES_FETCH_MATCHES,
	DISEASES_FETCH_MATCHES_FAILED,
	DISEASES_FETCH_MATCHES_SUCCEDED
} from "./app-data-actions";
import {combineReducers} from "redux";

const initialAuthState = {
	authInProgress: false,
	authError: null,
	successRedirect: null
};

const authReducer = function (state = initialAuthState, action) {
	switch (action.type) {
		case SUPER_SIGN_OUT_REQUESTED: {
			state = {...state, authInProgress: true, authError: null}
			return state;
		}
		case SUPER_SIGN_OUT_FAILED: {
			state = {...state, authInProgress: false, authError: action.payload};
			return state;
		}
		case SUPER_SIGN_OUT_SUCCEEDED: {
			state = {...state, authInProgress: false, successRedirect: "/super-admin/auth"};
			return state;
		}
	}
	return  state;
}

const initialDiseases = {
	query:null,
	matched_diseases:[],
	fetch_matches_error:null
};

const diseaseListReducer = function(state=initialDiseases, action){
	switch (action.type) {
		case DISEASES_CLEAR_MATCHES:{
			state = {...state, matched_diseases:[]};
			return state;
		}
		case DISEASES_FETCH_MATCHES:{
			state = {...state, fetch_matches_error:null, query:action.payload.query};
			return state;
		}
		case DISEASES_FETCH_MATCHES_SUCCEDED:{
			state = {...state, matched_diseases:action.payload};
			return state;
		}
		case DISEASES_FETCH_MATCHES_FAILED:{
			state = {...state, fetch_matches_error:action.payload};
			return state;
		}
	}
	return state;
}


export default combineReducers({authData: authReducer, diseaseList:diseaseListReducer});