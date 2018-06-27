import {call, put, takeEvery} from 'redux-saga/effects'
import base_url from "../base_url";

const actions = {
	API:"app/api"
};

const httpMethods = {
	POST:"POST",
	GET:"GET",
	PUT:"GET",
	DELETE:"DELETE",
}

let appSaga = function*() {
	yield takeEvery(actions.API, function*(action) {
		try{
			const options = {
				method:action.payload.method||'GET',
				headers:action.payload.headers||{'Content-Type':'application/json'},
				credentials: 'include'
			};
			if(options.method != 'GET'){
				options.body = JSON.stringify(action.payload.body)||JSON.stringify({});
			}
			const response = yield call(fetch, `${base_url}${action.payload.url}`, options);
			if (response.ok && action.payload.success){
				yield  put({type:action.payload.success, payload:yield response.json()});
			}
			else if(!response.ok && action.payload.failure){
				yield  put({type:action.payload.failure, payload:yield response.json()});
			}
		}catch(err){
			console.log(err)
			if(action.payload.failure){
				yield  put({type:action.payload.failure, payload:{message:"Unable to access server."}});
			}
		}
	});
};

export {
	actions,
	httpMethods,
	appSaga
};
