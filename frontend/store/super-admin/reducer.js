import {SUPER_SIGN_OUT_REQUESTED, SUPER_SIGN_OUT_FAILED, SUPER_SIGN_OUT_SUCCEEDED} from "./auth-actions";
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

const initialAppData={}

const appDataReducer = function(state=initialAppData, action){
	return state;
}


export default combineReducers({authData: authReducer, appData:appDataReducer});