import {call, put, takeEvery, select} from 'redux-saga/effects'
import base_url from "../base_url";
import Cookie from "js-cookie"

const appActions = {
	API: "app/api"
};

const httpMethods = {
	POST: "POST",
	GET: "GET",
	PUT: "PUT",
	DELETE: "DELETE",
};

let appSaga = function* () {
	yield takeEvery(appActions.API, function* (action) {
		try {
			const options = {
				method: action.payload.method || 'GET',
				headers: action.payload.headers || {'Content-Type': 'application/json'}
			};
			if (options.method != 'GET') {
				options.body = JSON.stringify(action.payload.body) || JSON.stringify({});
			}
			const response = yield call(fetch, `${base_url}${action.payload.url}`, options);
			if (response.ok) {
				if (action.meta.onSuccess) {
					yield action.meta.onSuccess(yield response.json());
				}
				if (action.meta.postSuccessAction) {
					yield  put({type: action.meta.postSuccessAction, payload: yield response.json()});
				}
			}
			else if (!response.ok) {
				if (action.meta.onFailure) {
					yield action.meta.onFailure(yield response.json());
				}
				if (action.meta.postFailureAction) {
					yield  put({type: action.meta.postFailureAction, payload: yield response.json()});
				}
			}
		} catch (err) {
			if (action.payload.failure || action.meta.failure) {
				if (action.meta.onFailure) {
					yield action.meta.onFailure({message: "Unable to access server."});
				}
				if (action.meta.postFailureAction) {
					yield  put({type: action.meta.postFailureAction, payload: {message: "Unable to access server."}});
				}
			}
		}
	});
};

export {
	appActions,
	httpMethods,
	appSaga
};
