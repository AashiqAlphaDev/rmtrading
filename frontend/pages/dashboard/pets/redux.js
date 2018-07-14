import {put, takeEvery} from 'redux-saga/effects'
import {userEvents} from "../../../store/domain/user";
import {petEvents} from "../../../store/domain/pet";
import _ from "underscore"

let listeners = []

const petsUiEvents = {

};

const petsUiDocActions = {
    SET_USERS:"pets/ui/doc/actions/SET_USERS",
    SET_PETS:"pets/ui/doc/actions/SET_PETS"
};

const initData = {
    users:[],
    pets:[]
};

let petsUiReducer = function(state=initData, {type, payload}){
    switch (type) {
	    case petsUiDocActions.SET_USERS:{
		    state = {...state, users:payload}
		    break;
	    }
        case petsUiDocActions.SET_PETS:{
            state = {...state, pets:payload}
            break;
        }
        default:{
            break;
        }
    }
    return state;
};

let delegate = function*(action){
	console.log(action);
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


    yield takeEvery(petEvents.FETCH_PETS_SUCCEEDED, function*(action) {
	    yield put({...action, type:petsUiDocActions.SET_PETS});
    });









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
    petsUiEvents,
    petsUiReducer,
    petsUiSaga,
	removeListener,
	addListener
}
