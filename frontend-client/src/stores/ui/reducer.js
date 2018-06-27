import {combineReducers} from "redux";
import {authUiReducer} from "./auth";
import {dashboardUiReducer, petsUiReducer} from "./dashboard";

export default combineReducers({
	auth: authUiReducer,
	dashboard: combineReducers({
			main: dashboardUiReducer,
			pets: petsUiReducer
	})
});