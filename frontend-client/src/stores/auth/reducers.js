import {
	AUTH_CLEAR,
	LOGIN_FAILED,
	LOGIN_SUCCEDED,
	REQUEST_LOGIN,
	REQUEST_SIGNUP,
	SIGNUP_FAILED,
	SIGNUP_SUCCEDED
} from "./actions";

const initAuthData = {};

function authReducer(state = initAuthData, action) {
	switch (action.type) {
		case AUTH_CLEAR:{
			state = initAuthData;
			break;
		}
		case REQUEST_LOGIN:{
			state = {...state, loginInProgress:true};
			break;
		}
		case REQUEST_SIGNUP:{
			state = {...state, signupInProgress:true};
			break;
		}
		case SIGNUP_FAILED:{
			state = {...state, signupInProgress:false, signupError:action.payload};
			break;
		}
		case LOGIN_FAILED:{
			state = {...state, loginInProgress:false, loginError:action.payload};
			break;
		}
		case SIGNUP_SUCCEDED:{
			state = {...state, redirect:"/admin/auth/login"};
			break;
		}
		case LOGIN_SUCCEDED:{
			state = {...state, redirect:"/admin/dashboard"};
			break;
		}
	}
	return state;
}

export default authReducer;