import {put, takeEvery} from 'redux-saga/effects'
import {actions as appActions, httpMethods} from "../app/saga";
import {userDocActions} from "./reducers";

const userCommands = {
	GET_GUARDIAN_WITH_ID:"user/commands/GET_GUARDIAN_WITH_ID",
	GET_GUARDIAN_FAILED:"user/commands/GET_GUARDIAN_FAILED",
	SET_AND_SELECT_GUARDIAN:"user/commands/SET_AND_SELECT_GUARDIAN",
};

function* userSaga() {
	yield takeEvery(userCommands.GET_GUARDIAN_WITH_ID, function*(action){
		yield put({
			type: appActions.API,
			payload: {
				url: `/users/by-mobile-or-gov-id/${action.payload.query}`,
				method: httpMethods.GET,
				success: userDocActions.SET_AND_SELECT_GUARDIAN,
				failure: userCommands.GET_GUARDIAN_FAILED
			}
		})
	})

	yield takeEvery(userCommands.SET_AND_SELECT_GUARDIAN, function*(action){
		put({...action, type:userDocActions.SET_GUARDIAN});
		put({...action, type:userDocActions.SELECT_GUARDIAN});
	});
	yield takeEvery(userCommands.GET_GUARDIAN_FAILED, function*(){

	});
}

export {userCommands, userSaga};
