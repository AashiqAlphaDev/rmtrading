import {put, takeEvery} from 'redux-saga/effects'
import {userEvents} from "../../../store/domain/user";

const petsUiEvents = {

};

const petsUiDocActions = {
    SET_CALLBACK_TRIGGER:"user/ui/doc/actions/SET_CALLBACK_TRIGGER",
};

const petsUiCommands = {
    RESET_CALLBACK_TRIGGER:"user/ui/doc/actions/RESET_CALLBACK_TRIGGER"
};

const initData = {
    triggeredCallback:null,
    users:[]
};

let petsUiReducer = function(state=initData, {type, payload}){
    switch (type) {
        case petsUiDocActions.SET_CALLBACK_TRIGGER:{
            state = {...state, triggeredCallback:payload};
            break;
        }
        default:{
            break;
        }
    }
    return state;
};


let petsUiSaga = function*() {
    yield takeEvery(userEvents.ADD_GUARDIAN_SUCCEEDED, function*(action){
        yield put({type:petsUiDocActions.SET_CALLBACK_TRIGGER, payload:{callbackId:action.payload.callbackId, success:true}})
    });
    yield takeEvery(userEvents.ADD_GUARDIAN_FAILED, function*(action){
        yield put({type:petsUiDocActions.SET_CALLBACK_TRIGGER, payload:{callbackId:action.payload.callbackId, success:false}})
    });
    yield takeEvery(petsUiCommands.RESET_CALLBACK_TRIGGER, function*(){
        yield put({type:petsUiDocActions.SET_CALLBACK_TRIGGER, payload:null})
    });
    yield takeEvery({userEvents.GET})
};

export {
    petsUiEvents,
    petsUiCommands,
    petsUiReducer,
    petsUiSaga
}
