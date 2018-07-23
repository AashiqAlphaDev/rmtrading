import {put, takeEvery} from 'redux-saga/effects'
import _ from "underscore"
import {appointmentEvents} from "../store/domain/appointments";


let listeners = []

const homeUiEvents = {

};

const homeUiDocActions = {
    SET_SLOTS:"home/ui/doc/actions/SET_SLOTS",
    
};

const initData = {
    slots:[]

};

let homeUiReducer = function(state=initData, {type, payload}){
    switch (type) {
        case homeUiDocActions.SET_SLOTS:{
            state = {...state, slots:payload}
            break;
        }
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

let homeUiSaga = function*() {
    yield takeEvery(appointmentEvents.FETCH_AVAILABLE_APPOINTMENTS_SUCCEEDED, delegate);
    yield takeEvery(appointmentEvents.FETCH_AVAILABLE_APPOINTMENTS_FAILED, delegate);

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
    homeUiDocActions,
    homeUiEvents,
    homeUiReducer,
    homeUiSaga,
    removeListener,
    addListener
}
