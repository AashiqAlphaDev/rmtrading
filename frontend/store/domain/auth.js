import {put, takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";

const authEvents = {
	ADMIN_LOGIN_STARTED:"auth/events/LOGIN_STARTED",
	ADMIN_LOGIN_SUCCEEDED:"auth/events/LOGIN_SUCCEEDED",
	ADMIN_LOGIN_FAILED:"auth/events/LOGIN_FAILED",
	ADMIN_LOGOUT_STARTED:"auth/events/ADMIN_LOGOUT_STARTED",
	ADMIN_LOGOUT_SUCCEEDED:"auth/events/ADMIN_LOGOUT_SUCCEEDED",
	ADMIN_LOGOUT_FAILED:"auth/events/ADMIN_LOGOUT_FAILED",
};

const authDocActions = {

};

const authCommands = {
	ADMIN_LOGIN:"auth/commands/ADMIN_LOGIN",
	ADMIN_LOGOUT:"auth/commands/ADMIN_LOGOUT"
};

const initData = {
	current_user:{
		is_logged_in:false,
		is_admin:false,
		is_super_admin:false,
		vet_center_id:null
	}
};

let authReducer = function(state=initData, {type, payload}){
	switch (type) {
		default:{
			break;
		}
	}
	return state;
};


let authSaga = function*() {
	yield takeEvery(authCommands.ADMIN_LOGIN, function*(action) {
		yield put({type:authEvents.ADMIN_LOGIN_STARTED});
		yield put({
			type: appActions.API,
			payload: {
				url: '/login',
				method: httpMethods.POST,
				body: action.payload
			},
			meta: {
				postFailureAction: authEvents.ADMIN_LOGIN_FAILED,
				postSuccessAction: authEvents.ADMIN_LOGIN_SUCCEEDED,
				onSuccess:function*(payload){
					if(typeof window === 'object'){
						document.cookie = `session_id=${payload.session_id}`
					}
				}
			}
		});
	});
	yield takeEvery(authCommands.ADMIN_LOGOUT, function*() {
		yield put({type:authEvents.ADMIN_LOGOUT_STARTED});
		yield put({
			type: appActions.API,
			payload: {
				url: '/logout',
				method: httpMethods.DELETE,
			},
			meta: {
				postFailureAction: authEvents.ADMIN_LOGOUT_FAILED,
				postSuccessAction: authEvents.ADMIN_LOGOUT_SUCCEEDED,
				onSuccess:function*(){
					if(typeof window === 'object'){
						document.cookie = `session_id=`
					}
				}
			}
		});
	});
};

export {
	authEvents,
	authDocActions,
	authCommands,
	authReducer,
	authSaga
}
