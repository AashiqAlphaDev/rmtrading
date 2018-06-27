import {call, put, takeEvery} from 'redux-saga/effects'
import {actions as appActions, httpMethods} from "../app/saga";
import {authCommands} from "../auth/sagas";
import {userDocActions} from "./reducers";

const userCommands = {
	GET_GUARDIAN_WITH_ID:"user/commands/GET_GUARDIAN_WITH_ID",
	GET_GUARDIAN_FAILED:"user/commands/GET_GUARDIAN_FAILED",
}




function* userSaga() {
	yield takeEvery(userCommands.GET_GUARDIAN_WITH_ID, function*(action){
		yield put({
			type: appActions.API,
			payload: {
				url: `/users/by-mobile-or-gov-id/${action.payload.query}`,
				method: httpMethods.GET,
				success: userDocActions.SET_GUARDIAN,
				failure: authCommands.GET_GUARDIAN_FAILED
			}
		})
	})
	yield takeEvery(authCommands.GET_GUARDIAN_FAILED, function*(){

	});
}

export default userSaga;
