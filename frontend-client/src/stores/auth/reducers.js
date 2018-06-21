import {
	AUTH_CLEAR,
	CHECK_ADMIN_FAILED,
	CHECK_ADMIN_PASSED,
	CHECK_SUPER_ADMIN,
	CHECK_SUPER_ADMIN_FAILED,
	CHECK_SUPER_ADMIN_PASSED,
	LOGIN_FAILED,
	LOGIN_SUCCEDED,
	LOGOUT_SUCCEDED,
	REQUEST_LOGIN,
	REQUEST_SIGNUP,
	REQUEST_SUPER_ADMIN_LOGIN,
	SIGNUP_FAILED,
	SIGNUP_SUCCEDED,
	SUPER_ADMIN_LOGIN_FAILED,
	SUPER_ADMIN_LOGIN_SUCCEDED,
	SUPER_ADMIN_LOGOUT_SUCCEDED
} from "./actions";

const initAuthData = {};

function authReducer(state = initAuthData, action) {
	switch (action.type) {
		case AUTH_CLEAR: {
			state = initAuthData;
			break;
		}
		case REQUEST_SUPER_ADMIN_LOGIN:
		case REQUEST_LOGIN: {
			state = {...state, loginInProgress: true};
			break;
		}
		case REQUEST_SIGNUP: {
			state = {...state, signupInProgress: true};
			break;
		}
		case SIGNUP_FAILED: {
			state = {...state, signupInProgress: false, signupError: action.payload};
			break;
		}
		case SUPER_ADMIN_LOGIN_FAILED:
		case LOGIN_FAILED: {
			state = {...state, loginInProgress: false, loginError: action.payload};
			break;
		}
		case SIGNUP_SUCCEDED: {
			state = {...state, loginInProgress: false, redirect: "/admin/auth/login"};
			break;
		}
		case SUPER_ADMIN_LOGIN_SUCCEDED: {
			state = {...state, loginInProgress: false, redirect: "/super-admin/dashboard"};
			break;
		}
		case CHECK_SUPER_ADMIN_PASSED: {
			state = {...state, isSuperAdmin: true, superAdminCheckInProgress: false};
			break;
		}
		case CHECK_ADMIN_PASSED: {
			state = {...state, isAdmin: true, adminCheckInProgress: false};
			break;
		}
		case CHECK_SUPER_ADMIN_FAILED: {
			state = {...state, isSuperAdmin: false, superAdminCheckInProgress: false};
			break;
		}
		case CHECK_ADMIN_FAILED: {
			state = {...state, isAdmin: false, adminCheckInProgress: false};
			break;
		}
		case CHECK_SUPER_ADMIN: {
			state = {...state, superAdminCheckInProgress: true};
			break;
		}
		case CHECK_SUPER_ADMIN: {
			state = {...state, adminCheckInProgress: true};
			break;
		}
		case LOGIN_SUCCEDED: {
			state = {...state, redirect: "/admin/dashboard"};
			break;
		}
		case LOGOUT_SUCCEDED: {
			state = {...state, redirect: "/admin/auth/login"};
			break;
		}
		case SUPER_ADMIN_LOGOUT_SUCCEDED: {
			state = {...state, redirect: "/super-admin/auth"};
			break;
		}
		default: {
			break;
		}
	}
	return state;
}

export default authReducer;