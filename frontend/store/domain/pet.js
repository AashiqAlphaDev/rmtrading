import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"

const petEvents = {

    FETCH_PETS_STARTED:"pets/events/FETCH_PETS_STARTED",
    FETCH_PETS_FAILED:"pets/events/FETCH_PETS_FAILED",
    FETCH_PETS_SUCCEEDED:"pets/events/FETCH_PETS_SUCCEEDED",

    ADD_PET_STARTED:"pets/events/ADD_PET_STARTED",
    ADD_PET_FAILED:"pets/events/ADD_PET_FAILED",
	ADD_PET_SUCCEEDED:"pets/events/ADD_PET_SUCCEEDED"



};

const petDocActions = {
    SET_PETS:"pets/command/SET_PETS"
};

const petCommands = {
    FETCH_PETS:"pets/command/FETCH_PETS",
	ADD_PET:"pets/command/ADD_PET"

};

const initData = {
    pets:{}
};

let petReducer = function(state=initData, {type, payload}){
	switch (type) {
        case petDocActions.SET_PETS:{
            payload.forEach((pet)=>{
                state = {...state, pets:{...state.pets, [pet._id]:pet}}
            });
            break;
        }
	    default:{
			break;
		}
	}
	return state;
};


let petSaga = function*() {
    yield takeLatest(petCommands.FETCH_PETS, function*(action) {
        yield put({type: petEvents.FETCH_PETS_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/pets/?${action.payload.query}`,
                method: httpMethods.GET
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: petEvents.FETCH_PETS_FAILED,
                onSuccess: function*(payload) {
                    yield put({type: petDocActions.SET_PETS, payload: payload.docs});
                    yield put({
                        type: petEvents.FETCH_PETS_SUCCEEDED, payload: _.map(payload.docs, (item) => {
                            return item._id
                        })
                    })
                }
            }
        });
    });


    yield takeEvery(petCommands.ADD_PET, function*(action) {
        console.log(action)
        yield put({type: petEvents.ADD_PET_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/pets`,
                method: httpMethods.POST,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: petEvents.ADD_PET_FAILED,
                postSuccessAction: petEvents.ADD_PET_SUCCEEDED
            }
        });
    });


}

export {
    petEvents,
    petDocActions,
    petCommands,
    petReducer,
    petSaga
}
