import { call, put, takeEvery} from 'redux-saga/effects'
import {
REQUEST_UPDATE_USER,
	UPDATE_USER_FAILED,
	UPDATE_USER_SUCCESS,
    REQUEST_CREATE_USER,
    CREATE_USER_SUCCEDED,
    CREATE_USER_FAILED
} from "./actions";
import base_url from "../base_url"


let updateUser = function*(action){
    try {

    	let body = action.payload.profile;
        const response = yield call(fetch, `${base_url}/users/${action.payload.user_id}`, {
            method:"PUT",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body)
        });
        if (response.ok) {
            yield put({type: UPDATE_USER_SUCCESS, payload: yield response.json()});
        }
        else {
            yield put({type: UPDATE_USER_FAILED, payload: yield response.json()});
        }
    } catch (error) {
        yield put({type: UPDATE_USER_FAILED, payload: error});
    }
}

let createUser = function*(action){
    try {

        let body = action.payload;
        const response = yield call(fetch, `${base_url}/users`, {
            method:"POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body)
        });
        if (response.ok) {
            yield put({type: CREATE_USER_SUCCEDED, payload: yield response.json()});
        }
        else {
            yield put({type: CREATE_USER_FAILED, payload: yield response.json()});
        }
    } catch (error) {
        yield put({type: CREATE_USER_FAILED, payload: error});
    }
}


function* userSaga() {
	yield takeEvery(REQUEST_UPDATE_USER, updateUser);
	yield takeEvery(REQUEST_CREATE_USER,createUser)

}

export default userSaga;
