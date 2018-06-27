const dashboardUiActions = {
	SET_ADMIN_CHECK_IN_PROGRESS:"dashboard/ui/SET_ADMIN_CHECK_IN_PROGRESS",
	SET_ADMIN_CHECK_DONE:"dashboard/ui/SET_ADMIN_CHECK_DONE",
	SHOW_ERROR:"dashboard/ui/SHOW_ERROR",
	CLEAR_ERROR:"dashboard/ui/CLEAR_ERROR",
};

const initDashboardData = {
	check_in_progress:true,
	error:null
};

let dashboardUiReducer = function (state=initDashboardData, {type, payload}) {
	switch (type) {
		case dashboardUiActions.SET_ADMIN_CHECK_IN_PROGRESS:{
			state = {...state, check_in_progress:true}
			break;
		}
		case dashboardUiActions.SET_ADMIN_CHECK_DONE:{
			state = {...state, check_in_progress:false}
			break;
		}
		case dashboardUiActions.SHOW_ERROR:{
			state = {...state, error:payload};
			break;
		}
		case dashboardUiActions.CLEAR_ERROR:{
			state = {...state, error:null};
			break;
		}
		default:{
			break;
		}
	}
	return state;
};


const petsUiActions = {

};

const initPetsData ={

};

let petsUiReducer = function(state = initPetsData, {type}){
	switch (type) {
		default:{
			break;
		}
	}
	return state;
}

export {dashboardUiReducer, dashboardUiActions, petsUiActions, petsUiReducer};