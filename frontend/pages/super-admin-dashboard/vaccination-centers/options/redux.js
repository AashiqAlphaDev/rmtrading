import {put, takeEvery} from 'redux-saga/effects'
import _ from "underscore"
import {claimEvents} from "../../../../store/domain/claim";
import {vaccinationCenterEvents} from "../../../../store/domain/vaccination-center";

let listeners = []

const claimsUiEvents = {

};

const claimsUiDocActions = {

};

const initData = {


};

let claimsUiReducer = function(state=initData, {type, payload}){
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

let claimsUiSaga = function*() {



    yield takeEvery(claimEvents.DELETE_CLAIM_SUCCEEDED,delegate)
    yield takeEvery(vaccinationCenterEvents.ADD_VACCINATION_CENTER_ADMIN_SUCCEEDED,delegate)

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
    claimsUiDocActions,
    claimsUiEvents,
    claimsUiReducer,
    claimsUiSaga,
	removeListener,
	addListener
}
