import {
	REQUEST_CREATE_USER,
	CREATE_USER_SUCCEDED,
	CREATE_USER_FAILED, CLEAR_USER

} from "./actions";

const initIUserData = {};

function userReducer(state = initIUserData, action) {
	switch (action.type) {
		case CLEAR_USER:{
			state = initIUserData;
			break;
		}
		case REQUEST_CREATE_USER: {
			state = {...state};
			break;
		}
		case CREATE_USER_SUCCEDED: {
			state = {...state, userCreated:true};
			break;
		}
		case CREATE_USER_FAILED: {
			state = {...state};
			break;
		}
		default: {
			break;
		}
	}
	return state;
}

export default userReducer;