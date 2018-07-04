import {combineReducers} from "redux";
import {authUiReducer} from "../../admin/auth/store/reducer";
import {signUpUiReducer} from "../../admin/auth/signup/store/reducer";
import {loginUiReducer} from "../../admin/auth/login/store/reducer";


let uiReducer = combineReducers({
	auth:combineReducers({
		root:authUiReducer,
		signUp:signUpUiReducer,
		login:loginUiReducer
	})
});

export {uiReducer};