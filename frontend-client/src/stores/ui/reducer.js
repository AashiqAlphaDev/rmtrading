import {combineReducers} from "redux";
import {authUiReducer} from "../../admin/auth/store/reducer";
import {authUiReducer as superAdminAuthUiReducer} from "../../super-admin/auth/store/reducer";
import {petsUiReducer} from "../../admin/dashboard/pets/store/reducer";
import {dashboardUiReducer} from "../../admin/dashboard/store/reducer";

export default combineReducers({
	auth: authUiReducer,
	super_admin_auth:superAdminAuthUiReducer,
	dashboard: combineReducers({
		main: dashboardUiReducer,
		pets: petsUiReducer
	})
});