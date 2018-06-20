import { call, put, takeEvery} from 'redux-saga/effects'
import {
	CHECK_ADMIN, CHECK_ADMIN_FAILED, CHECK_ADMIN_PASSED,
	CHECK_SUPER_ADMIN,
	CHECK_SUPER_ADMIN_FAILED,
	CHECK_SUPER_ADMIN_PASSED,
	LOGIN_FAILED,
	LOGIN_SUCCEDED, LOGOUT_FAILED, LOGOUT_SUCCEDED, REQUEST_ADMIN_LOGOUT,
	REQUEST_LOGIN, REQUEST_LOGOUT,
	REQUEST_SIGNUP,
	REQUEST_SUPER_ADMIN_LOGIN,
	REQUEST_SUPER_ADMIN_LOGOUT,
	SIGNUP_FAILED,
	SIGNUP_SUCCEDED,
	SUPER_ADMIN_LOGIN_FAILED,
	SUPER_ADMIN_LOGIN_SUCCEDED,
	SUPER_ADMIN_LOGOUT_FAILED,
	SUPER_ADMIN_LOGOUT_SUCCEDED
} from "./actions";
import base_url from "../base_url"

function* loginUser(action) {
	try {
		const response = yield call(fetch, `${base_url}/login`, {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			credentials: 'include',
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
		const response = yield call(fetch, `${base_url}/register`, {
			method:"POST",
			headers:{
				"Content-Type":"application/json",
			},
			credentials: 'include',
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
		const response = yield call(fetch, `${base_url}/super-admin/login`, {
			method:"POST",
			headers:{
				"Content-Type":"application/json",
			},
			credentials: 'include',
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

function* checkSuperAdmin(){
	try {
		const response = yield call(fetch, `${base_url}/super-admin/`, {
			credentials: 'include'
		});
		if(response.ok){
			yield put({type: CHECK_SUPER_ADMIN_PASSED, payload:yield response.json()});
		}
		else {
			yield put({type: CHECK_SUPER_ADMIN_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: CHECK_SUPER_ADMIN_FAILED, payload:error});
	}
}

function* checkAdmin(){
	try {
		const response = yield call(fetch, `${base_url}/admin/`, {
			credentials: 'include'
		});
		if(response.ok){
			yield put({type: CHECK_ADMIN_PASSED, payload:yield response.json()});
		}
		else {
			yield put({type: CHECK_ADMIN_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: CHECK_ADMIN_FAILED, payload:error});
	}
}



function* superAdminLogout(){
	try {
		const response = yield call(fetch, `${base_url}/super-admin/logout`, {
			credentials: 'include'
		});
		if(response.ok){
			yield put({type: SUPER_ADMIN_LOGOUT_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: SUPER_ADMIN_LOGOUT_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: SUPER_ADMIN_LOGOUT_FAILED, payload:error});
	}
}

function* logout(){
	try {
		const response = yield call(fetch, `${base_url}/logout`, {
			method:'DELETE',
			credentials: 'include'
		});
		if(response.ok){
			yield put({type: LOGOUT_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: LOGOUT_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: LOGOUT_FAILED, payload:error});
	}
}

function* authSaga() {
	yield takeEvery(REQUEST_LOGIN, loginUser);
	yield takeEvery(REQUEST_SIGNUP, signupUser);
	yield takeEvery(REQUEST_SUPER_ADMIN_LOGIN, loginSuperAdmin);
	yield takeEvery(CHECK_SUPER_ADMIN, checkSuperAdmin);
	yield takeEvery(CHECK_ADMIN, checkAdmin);
	yield takeEvery(REQUEST_SUPER_ADMIN_LOGOUT, superAdminLogout);
	yield takeEvery(REQUEST_LOGOUT, logout);
}

export default authSaga;
