import {
	AUTH_CLEAR,
	LOGIN_FAILED,
	LOGIN_SUCCEDED,
	REQUEST_LOGIN,
	REQUEST_SIGNUP, REQUEST_SUPER_ADMIN_LOGIN,
	SIGNUP_FAILED,
	SIGNUP_SUCCEDED, SUPER_ADMIN_LOGIN_FAILED, SUPER_ADMIN_LOGIN_SUCCEDED
} from "./actions";

const initAuthData = {};

function authReducer(state = initAuthData, action) {
	switch (action.type) {
		case AUTH_CLEAR:{
			state = initAuthData;
			break;
		}
		case REQUEST_SUPER_ADMIN_LOGIN:
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
		case SUPER_ADMIN_LOGIN_FAILED:
		case LOGIN_FAILED:{
			state = {...state, loginInProgress:false, loginError:action.payload};
			break;
		}
		case SIGNUP_SUCCEDED:{
			state = {...state, redirect:"/admin/auth/login"};
			break;
		}
		case SUPER_ADMIN_LOGIN_SUCCEDED:{
			state = {...state, redirect:"/super-admin/dashboard"};
			break;
		}
		case LOGIN_SUCCEDED:{
			state = {...state, redirect:"/admin/dashboard"};
			break;
		}
		default: {
			break;
		}
	}
	return state;
}

export default authReducer;