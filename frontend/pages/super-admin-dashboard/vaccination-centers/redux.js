import {put, takeEvery} from 'redux-saga/effects'


import _ from "underscore"
import {vaccinationCenterEvents} from "../../../store/domain/vaccination-center";



let listeners = []

const vaccinationCentersUiEvents = {

};

const vaccinationCentersUiDocActions = {
    SET_VACCINATION_CENTERS:"vaccinationCenters/ui/doc/actions/SET_VACCINATION_CENTERS",
    CLEAR_VACCINATION_CENTERS:"vaccinationCenters/ui/doc/actions/CLEAR_VACCINATION_CENTERS",
    SET_QUERY:"vaccinationCenters/ui/doc/actions/SET_QUERY",
};

const initData = {
    vaccinationCenters:[],
    query:""
};

let vaccinationCentersUiReducer = function(state=initData, {type, payload}){
    switch (type) {
	    case vaccinationCentersUiDocActions.SET_VACCINATION_CENTERS:{
		    state = {...state, vaccinationCenters:payload}
		    break;
	    }
        case vaccinationCentersUiDocActions.CLEAR_VACCINATION_CENTERS:{
            state = {...state, vaccinationCenters:[]}
            break;
        }
        case vaccinationCentersUiDocActions.SET_QUERY:{
            state = {...state, query:payload}
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

let vaccinationCentersUiSaga = function*() {

    yield takeEvery(vaccinationCenterEvents.ADD_VACCINATION_CENTER_SUCCEEDED, delegate);
    yield takeEvery(vaccinationCenterEvents.DELETE_VACCINATION_CENTER_SUCCEEDED, delegate);
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
    vaccinationCentersUiDocActions,
    vaccinationCentersUiEvents,
    vaccinationCentersUiReducer,
    vaccinationCentersUiSaga,
	removeListener,
	addListener
}
