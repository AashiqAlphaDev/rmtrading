const dashboardUiActions = {
	SET_ADMIN_CHECK_IN_PROGRESS:"dashboard/ui/SET_ADMIN_CHECK_IN_PROGRESS",
	SET_ADMIN_CHECK_DONE:"dashboard/ui/SET_ADMIN_CHECK_DONE",
};

const initDashboardData = {
	check_in_progress:false
};

let dashboardUiReducer = function (state=initDashboardData, {type}) {
	switch (type) {
		case dashboardUiActions.SET_ADMIN_CHECK_IN_PROGRESS:{
			state = {...state, check_in_progress:true}
			break;
		}
		case dashboardUiActions.SET_ADMIN_CHECK_DONE:{
			state = {...state, check_in_progress:false}
			break;
		}
		default:{
			break;
		}
	}
	return state;
};

export {dashboardUiReducer, dashboardUiActions};