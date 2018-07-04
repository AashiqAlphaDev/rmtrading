const authDocActions = {

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
		default: {
			break;
		}
	}
	return state;
}

export {authReducer, authDocActions};