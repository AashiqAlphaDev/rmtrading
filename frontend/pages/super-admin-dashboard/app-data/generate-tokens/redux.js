import {put, takeEvery} from 'redux-saga/effects'


import _ from "underscore"
import {tokenEvents} from "../../../../store/domain/token";





let listeners = []

const tokensUiEvents = {

};

const tokensUiDocActions = {
    
};

const initData = {
  
};


let tokensUiReducer = function(state=initData, {type, payload}){
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

let tokensUiSaga = function*() {



     yield takeEvery(tokenEvents.GENERATE_TOKENS_SUCCEEDED, delegate);

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
    tokensUiDocActions,
    tokensUiEvents,
    tokensUiReducer,
    tokensUiSaga,
	removeListener,
	addListener
}
