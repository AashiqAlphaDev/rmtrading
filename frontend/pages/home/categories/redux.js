/**
 * Created by aashiq on 17/08/18.
 */
import {put, takeEvery} from 'redux-saga/effects'
import _ from "underscore"

let listeners = []

const homeUiEvents = {

};

const homeUiDocActions = {


};

const initData = {
    centers:[],
    query:""
};

let homeUiReducer = function(state=initData, {type, payload}){
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

let homeUiSaga = function*() {

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
