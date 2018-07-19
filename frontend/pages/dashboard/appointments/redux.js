import {put, takeEvery} from 'redux-saga/effects'
import {appointmentEvents, vaccinationCenterEvents} from "../../../store/domain/appointment";
import _ from "underscore"

let listeners = []

const appointmentsUiEvents = {

};

const appointmentsUiDocActions = {
  
};

const initData = {
   
};

let appointmentsUiReducer = function(state=initData, {type, payload}){
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

let appointmentsUiSaga = function*() {


    yield takeEvery(vaccinationCenterEvents.UPDATE_VACCINATION_CENTER_SUCCEEDED, delegate);
    yield takeEvery(vaccinationCenterEvents.UPDATE_VACCINATION_CENTER_FAILED, delegate);

   

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
    appointmentsUiDocActions,
    appointmentsUiEvents,
    appointmentsUiReducer,
    appointmentsUiSaga,
	removeListener,
	addListener
}
