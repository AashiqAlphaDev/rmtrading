import { call, put, takeEvery} from 'redux-saga/effects'
import {
	LOGIN_FAILED,
	LOGIN_SUCCEDED,
	REQUEST_LOGIN,
	REQUEST_SIGNUP,
	REQUEST_SUPER_ADMIN_LOGIN,
	SIGNUP_FAILED,
	SIGNUP_SUCCEDED, SUPER_ADMIN_LOGIN_FAILED, SUPER_ADMIN_LOGIN_SUCCEDED
} from "./actions";

function* loginUser(action) {
	try {
		const response = yield call(fetch, "/api/login", {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if(response.ok){
			yield put({type: LOGIN_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: LOGIN_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		console.log(error);
		yield put({type: LOGIN_FAILED, payload:error});
	}
}

function* signupUser(action) {
	try {
		const response = yield call(fetch, "/api/register", {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if(response.ok){
			yield put({type: SIGNUP_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: SIGNUP_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: SIGNUP_FAILED, payload:error});
	}
}

function* loginSuperAdmin(action){
	try {
		const response = yield call(fetch, "/api/super-admin/login", {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if(response.ok){
			yield put({type: SUPER_ADMIN_LOGIN_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: SUPER_ADMIN_LOGIN_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: SUPER_ADMIN_LOGIN_FAILED, payload:error});
	}
}


function* authSaga() {
	yield takeEvery(REQUEST_LOGIN, loginUser);
	yield takeEvery(REQUEST_SIGNUP, signupUser);
	yield takeEvery(REQUEST_SUPER_ADMIN_LOGIN, loginSuperAdmin);
}

export default authSaga;
