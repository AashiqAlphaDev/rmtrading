import {put, takeEvery} from 'redux-saga/effects'
import {userCommands, userEvents} from "../../../store/domain/user";
import {petEvents} from "../../../store/domain/pet";
import _ from "underscore"

let listeners = []

const petsUiEvents = {

};

const petsUiDocActions = {
    SET_USERS:"pets/ui/doc/actions/SET_USERS",
    CLEAR_USERS:"pets/ui/doc/actions/CLEAR_USERS",
    SET_QUERY:"pets/ui/doc/actions/SET_QUERY",
};

const initData = {
    users:[],
    query:""
};

let petsUiReducer = function(state=initData, {type, payload}){
    switch (type) {
	    case petsUiDocActions.SET_USERS:{
		    state = {...state, users:payload}
		    break;
	    }
        case petsUiDocActions.CLEAR_USERS:{
            state = {...state, users:[]}
            break;
        }
        case petsUiDocActions.SET_QUERY:{
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

let petsUiSaga = function*() {
    yield takeEvery(userEvents.ADD_GUARDIAN_SUCCEEDED, delegate);
    yield takeEvery(userEvents.ADD_GUARDIAN_FAILED, delegate);
    yield takeEvery(userEvents.FETCH_GUARDIANS_SUCCEEDED, function*(action) {
	    yield put({...action, type:petsUiDocActions.SET_USERS});
    });
    yield takeEvery(userEvents.CLEAR_FETCH_GUARDIANS, function*() {
        yield put({payload:[], type:petsUiDocActions.SET_USERS});
    });
    yield takeEvery(petEvents.FETCH_PETS_SUCCEEDED, function*(action) {
	    yield put({...action, type:petsUiDocActions.SET_PETS});
    });

    yield takeEvery(petsUiDocActions.SET_QUERY, function*({payload}) {
        if(payload===""){
            yield put({type:petsUiDocActions.CLEAR_USERS})
        }
        else{
            yield put({type:userCommands.FETCH_GUARDIANS,payload:{query:payload}})
        }
    })

    yield takeEvery(petEvents.ADD_PET_SUCCEEDED, delegate);
    yield takeEvery(petEvents.ADD_PET_FAILED, delegate);








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
    petsUiDocActions,
    petsUiEvents,
    petsUiReducer,
    petsUiSaga,
	removeListener,
	addListener
}
