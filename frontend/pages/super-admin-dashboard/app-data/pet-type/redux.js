import {put, takeEvery} from 'redux-saga/effects'


import _ from "underscore"

import {petTypeEvents} from "../../../../store/domain/pet-types";



let listeners = []

const petTypesUiEvents = {

};

const petTypesUiDocActions = {
    
};

const initData = {
  
};

let petTypesUiReducer = function(state=initData, {type, payload}){
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

let petTypesUiSaga = function*() {

    yield takeEvery(petTypeEvents.ADD_PET_TYPE_SUCCEEDED, delegate);
    yield takeEvery(petTypeEvents.ADD_BREED_SUCCEEDED, delegate);
    yield takeEvery(petTypeEvents.DELETE_PET_TYPE_SUCCEEDED, delegate);
    yield takeEvery(petTypeEvents.UPDATE_PET_TYPE_SUCCEEDED, delegate);

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
    petTypesUiDocActions,
    petTypesUiEvents,
    petTypesUiReducer,
    petTypesUiSaga,
	removeListener,
	addListener
}
