const authDocActions = {
	ADMIN_LOGIN:"auth/doc/actions/ADMIN_LOGIN",
	RESET:"auth/doc/actions/RESET"
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
		case authDocActions.ADMIN_LOGIN:{
			state = {...state, current_user:{...state.current_user, logged_in:true, is_admin:true}};
			break;
		}
		case authDocActions.RESET:{
			state = {...initAuthData};
			break;
		}
		default: {
			break;
		}
	}
	return state;
}

export {authReducer, authDocActions};