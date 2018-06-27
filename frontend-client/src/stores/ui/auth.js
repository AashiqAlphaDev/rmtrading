const authUiActions = {
	SHOW_AUTH_PROGRESS:"auth/ui/SHOW_LOGIN_PROGRESS",
	HIDE_AUTH_PROGRESS:"auth/ui/HIDE_LOGIN_PROGRESS",
	SHOW_ERROR:"auth/ui/SHOW_LOGIN_ERROR",
	CLEAR_AUTH:"auth/ui/CLEAR_AUTH",
};

const initAuthData = {
	auth_in_progress:false,
	error:null
};

let authUiReducer = function (state=initAuthData, {type, payload}) {
	switch (type) {
		case authUiActions.SHOW_AUTH_PROGRESS:{
			state = {...state, auth_in_progress:true};
			break;
		}
		case authUiActions.HIDE_AUTH_PROGRESS:{
			state = {...state, auth_in_progress:false};
			break;
		}
		case authUiActions.SHOW_ERROR:{
			state = {...state, error:payload};
			break;
		}
		case authUiActions.CLEAR_AUTH:{
			state = {...initAuthData};
			break;
		}
		default:{
			break;
		}
	}
	return state;
};

export {authUiReducer, authUiActions};