import {put, takeEvery} from 'redux-saga/effects'
import {userEvents} from "../../../store/domain/user";
import _ from "underscore"

let listeners = []

const petsUiEvents = {

};

const petsUiDocActions = {
    SET_USERS:"pets/ui/doc/actions/SET_USERS"
};

const initData = {
    users:[]
};

let petsUiReducer = function(state=initData, {type, payload}){
    switch (type) {
	    case petsUiDocActions.SET_USERS:{
		    state = {...state, users:payload}
	    }
        default:{
            break;
        }
    }
    return state;
};

let delegate = function*(action){
	console.log(action);
	listeners.forEach(function(listener){
		if(listener.onAction){
			listener.onAction.call(listener,action);
        }
    });
}

let petsUiSaga = function*() {
    yield takeEvery(userEvents.ADD_GUARDIAN_SUCCEEDED, delegate);
    yield takeEvery(userEvents.ADD_GUARDIAN_FAILED, delegate);
    yield takeEvery(userEvents.FETCH_GUARDIANS_SUCCEEDED, function*(action) {
	    yield put({...action, type:petsUiDocActions.SET_USERS});
    });
};


let addListener = (listener)=>{
    listeners.push(listener);
}

let removeListener = (listener)=>{
	listeners = _.reject(listeners, function (item) {
		return listener===item;
	});
}

export {
    petsUiEvents,
    petsUiReducer,
    petsUiSaga,
	removeListener,
	addListener
}
