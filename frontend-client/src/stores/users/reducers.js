import {
	REQUEST_UPDATE_USER,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILED,
    REQUEST_CREATE_USER,
    CREATE_USER_SUCCEDED,
    CREATE_USER_FAILED

} from "./actions";

const initIUserData = {};

function userReducer(state = initIUserData, action) {
	switch (action.type) {

		case REQUEST_UPDATE_USER:{
			state = {...state, redirect:"/admin/auth"};
			break;
		}

		case UPDATE_USER_SUCCESS:{
            state = {...state, redirect:"/super-admin/auth"};
			break;
		}
        case UPDATE_USER_FAILED:{
            state = {...state, redirect:"/super-admin/auth"};
            break;
        }
        case REQUEST_CREATE_USER:{
            state = {...state, redirect:"/admin/auth"};
            break;
        }

        case CREATE_USER_SUCCEDED:{
            state = {...state, redirect:"/super-admin/auth"};
            break;
        }
        case CREATE_USER_FAILED:{
            state = {...state, redirect:"/super-admin/auth"};
            break;
        }
		default: {
			break;
		}
	}
	return state;
}

export default userReducer;