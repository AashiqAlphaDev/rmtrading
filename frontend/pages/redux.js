import {put, takeEvery} from 'redux-saga/effects'
import _ from "underscore"
import {vaccinationCenterCommands, vaccinationCenterEvents} from "../store/domain/vaccination-center";
import {claimEvents} from "../store/domain/claim";




let listeners = []

const homeUiEvents = {

};

const homeUiDocActions = {
    SET_CENTERS:"home/ui/doc/actions/SET_CENTERS",
    CLEAR_CENTERS:"home/ui/doc/actions/CLEAR_CENTERS",
    SET_QUERY:"home/ui/doc/actions/SET_QUERY",
};

const initData = {
    centers:[],
    query:""
};

let homeUiReducer = function(state=initData, {type, payload}){
    switch (type) {
        case homeUiDocActions.SET_CENTERS:{
            console.log(payload.docs)
            state = {...state, centers:payload.docs}
            break;
        }
        case homeUiDocActions.CLEAR_CENTERS:{
            state = {...state, centers:[]}
            break;
        }
        case homeUiDocActions.SET_QUERY:{
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

let homeUiSaga = function*() {
    yield takeEvery(vaccinationCenterEvents.FETCH_VACCINATION_CENTERS_SUCCEEDED, function*(action) {
        yield put({...action, type:homeUiDocActions.SET_CENTERS});
    });
    yield takeEvery(vaccinationCenterEvents.CLEAR_FETCH_VACCINATION_CENTERS, function*() {
        yield put({payload:[], type:homeUiDocActions.SET_CENTERS});
    });
    yield takeEvery(homeUiDocActions.SET_QUERY, function*({payload}) {
        if(payload===""){
            yield put({type:homeUiDocActions.CLEAR_CENTERS})
        }
        else{
            yield put({type:vaccinationCenterCommands.FETCH_VACCINATION_CENTERS,payload:{query:payload}})
        }
    })
    yield takeEvery(claimEvents.ADD_CLAIM_SUCCEEDED, delegate);
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
