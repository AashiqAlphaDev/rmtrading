import {call, put, takeEvery, select} from 'redux-saga/effects'
import base_url from "../base_url";
import fetch from "isomorphic-fetch"

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
				headers: action.payload.headers || {'Content-Type': 'application/json'},
				credentials: 'include'
			};
			if (options.method != 'GET') {
				options.body = JSON.stringify(action.payload.body) || JSON.stringify({});
			}

			const response = yield call(fetch, `${base_url}${action.payload.url}`, options);
            console.log(action);
			let responseData = yield response.json();
			if (response.ok) {
				if (action.meta.onSuccess) {
					yield action.meta.onSuccess(responseData);
				}
				if (action.meta.postSuccessAction) {
					if(action.callbackId){
                        yield  put({type: action.meta.postSuccessAction, payload:{callbackId:action.meta.callbackId, response:responseData}});
					}
					else{
                        yield  put({type: action.meta.postSuccessAction, payload: responseData});
					}
				}
			}
			else if (!response.ok) {
				if (action.meta.onFailure) {
					yield action.meta.onFailure(responseData);
				}
				if (action.meta.postFailureAction) {
                    if(action.callbackId){
                        yield  put({type: action.meta.postFailureAction, payload: {callbackId:action.meta.callbackId, response:responseData}});
					}
					else{
                        yield  put({type: action.meta.postFailureAction, payload: responseData});
					}

				}
			}
		} catch (err) {
            console.log(err);
			if (action.payload.failure || action.meta.failure) {
				if (action.meta.onFailure) {
					yield action.meta.onFailure({message: "Unable to access server."});
				}
				if (action.meta.postFailureAction) {
                    if(action.callbackId){
                        yield  put({type: action.meta.postFailureAction, payload: {callbackId:action.meta.callbackId, response:{message: "Unable to access server."}}});
                    }
                    else{
                        yield  put({type: action.meta.postFailureAction, payload: {message: "Unable to access server."}});
                    }
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
