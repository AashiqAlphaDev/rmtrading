import {put, takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";

const authEvents = {
	LOGIN_STARTED:"auth/commands/LOGIN_STARTED",
	LOGIN_SUCCEEDED:"auth/commands/LOGIN_SUCCEEDED",
	LOGIN_FAILED:"auth/commands/LOGIN_FAILED"
};

const authDocActions = {

};

const authCommands = {
	ADMIN_LOGIN:"auth/commands/ADMIN_LOGIN"
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
		yield put({type:authEvents.LOGIN_STARTED});
		yield put({
			type: appActions.API,
			payload: {
				url: '/login',
				method: httpMethods.POST,
				body: action.payload,
				authorized:true
			},
			meta: {
				postFailureAction: authEvents.LOGIN_FAILED,
				postSuccessAction: authEvents.LOGIN_SUCCEEDED,
				onSuccess:function*(payload){
					if(typeof window === 'object'){
						document.cookie = `session_id=${payload.session_id}`
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
