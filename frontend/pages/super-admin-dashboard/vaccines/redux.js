import {put, takeEvery} from 'redux-saga/effects'


import _ from "underscore"

import {vaccineEvents} from "../../../store/domain/vaccines";



let listeners = []

const vaccinesUiEvents = {

};

const vaccinesUiDocActions = {
    
};

const initData = {
  
};

let vaccinesUiReducer = function(state=initData, {type, payload}){
    switch (type) {
        default:{
            break;
        }
    }
    return state;
};

let delegate = function*(action){
	listeners.forEach(function(listener){
		if(listener.onAction){
			listener.onAction.call(listener,action);
        }
    });
}

let vaccinesUiSaga = function*() {

    yield takeEvery(vaccineEvents.ADD_VACCINE_SUCCEEDED, delegate);
    yield takeEvery(vaccineEvents.DELETE_VACCINE_SCHEDULE_SUCCEEDED, delegate);
    yield takeEvery(vaccineEvents.ADD_VACCINE_SCHEDULE_SUCCEEDED, delegate);
    yield takeEvery(vaccineEvents.DELETE_VACCINE_SUCCEEDED, delegate);

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
    vaccinesUiDocActions,
    vaccinesUiEvents,
    vaccinesUiReducer,
    vaccinesUiSaga,
	removeListener,
	addListener
}
