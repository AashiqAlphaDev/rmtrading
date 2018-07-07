import {combineReducers} from "redux";
import {authUiReducer} from "../../admin/auth/store/reducer";
import {signUpUiReducer} from "../../admin/auth/signup/store/reducer";
import {loginUiReducer} from "../../admin/auth/login/store/reducer";
import {dashboardUiReducer} from "../../admin/dashboard/store/reducer";
import {overviewUiReducer} from "../../admin/dashboard/overview/store/reducer";
import {appointmentsUiReducer} from "../../admin/dashboard/appointments/store/reducer";
import {petsUiReducer} from "../../admin/dashboard/pets/store/reducer";


let uiReducer = combineReducers({
	auth:combineReducers({
		root:authUiReducer,
		signUp:signUpUiReducer,
		login:loginUiReducer
	}),
	dashboard:combineReducers({
		root:dashboardUiReducer,
		overview:overviewUiReducer,
		appointments:appointmentsUiReducer,
		pets:petsUiReducer

	})
});

export {uiReducer};







