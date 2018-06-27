const authDocActions = {
	AUTH_CLEAR:"auth/document/AUTH_CLEAR",
	ADMIN_LOGIN:"auth/document/ADMIN_LOGIN",
	SUPER_ADMIN_LOGIN:"auth/document/SUPER_ADMIN_LOGIN",
	ADMIN_LOGOUT:"auth/document/ADMIN_LOGOUT",
	SUPER_ADMIN_LOGOUT:"auth/document/SUPER_ADMIN_LOGOUT",
};

const initAuthData = {
	current_user:{
		logged_in:false,
		is_admin:false,
		is_super_admin:false
	}
};

function authReducer(state = initAuthData, {type}) {
	switch (type) {
		case authDocActions.AUTH_CLEAR:{
			state = {...initAuthData};
			break;
		}
		case authDocActions.ADMIN_LOGIN:{
			state = {...state, current_user:{...state.current_user, logged_in:true, is_admin:true}};
			break;
		}
		case authDocActions.SUPER_ADMIN_LOGIN:{
			state = {...state, current_user:{...state.current_user, logged_in:true, is_super_admin:true}};
			break;
		}
		case authDocActions.ADMIN_LOGOUT:{
			state = {...state, current_user:{...state, is_admin:false}};
			break;
		}
		case authDocActions.SUPER_ADMIN_LOGOUT:{
			state = {...state, current_user:{...state, is_super_admin:false}};
			break;
		}
		default: {
			break;
		}
	}
	return state;
}

export {authReducer, authDocActions};