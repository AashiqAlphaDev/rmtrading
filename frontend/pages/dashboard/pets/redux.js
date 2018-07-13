import {put, takeEvery} from 'redux-saga/effects'
import {userEvents} from "../../../store/domain/user";
import _ from "underscore"

let listeners = []

const petsUiEvents = {

};

const petsUiDocActions = {
    SET_CALLBACK_TRIGGER:"user/ui/doc/actions/SET_CALLBACK_TRIGGER",
};

const petsUiCommands = {
    RESET_CALLBACK_TRIGGER:"user/ui/doc/actions/RESET_CALLBACK_TRIGGER"
};

const initData = {
    filteredUsers:[]
};

let petsUiReducer = function(state=initData, {type, payload}){
    switch (type) {
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
    petsUiCommands,
    petsUiReducer,
    petsUiSaga,
	removeListener,
	addListener
}
