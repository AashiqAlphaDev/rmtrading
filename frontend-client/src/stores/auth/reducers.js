import {REQUEST_LOGIN} from "./actions";

const initAuthData = {};

function authReducer(state = initAuthData, action) {
	switch (action.type) {
		case REQUEST_LOGIN:{
			state = {...state, loginInProgress:true};
			break;
		}
	}
	return state;
}

export default authReducer;