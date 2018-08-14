import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"

const petTypeEvents = {

    ADD_PET_TYPE_STARTED:"petTypes/events/ADD_PET_TYPE_STARTED",
    ADD_PET_TYPE_FAILED:"petTypes/events/ADD_PET_TYPE_FAILED",
	ADD_PET_TYPE_SUCCEEDED:"petTypes/events/ADD_PET_TYPE_SUCCEEDED",

    DELETE_PET_TYPE_STARTED:"petTypes/events/DELETE_PET_TYPE_STARTED",
    DELETE_PET_TYPE_FAILED:"petTypes/events/DELETE_PET_TYPE_FAILED",
    DELETE_PET_TYPE_SUCCEEDED:"petTypes/events/DELETE_PET_TYPE_SUCCEEDED",

    UPDATE_PET_TYPE_STARTED:"petTypes/events/UPDATE_PET_TYPE_STARTED",
    UPDATE_PET_TYPE_FAILED:"petTypes/events/UPDATE_PET_TYPE_FAILED",
    UPDATE_PET_TYPE_SUCCEEDED:"petTypes/events/UPDATE_PET_TYPE_SUCCEEDED",

    ADD_BREED_STARTED:"petTypes/events/ADD_BREED_STARTED",
    ADD_BREED_FAILED:"petTypes/events/ADD_BREED_FAILED",
    ADD_BREED_SUCCEEDED:"petTypes/events/ADD_BREED_SUCCEEDED",

    DELETE_BREED_STARTED:"petTypes/events/DELETE_BREED_STARTED",
    DELETE_BREED_FAILED:"petTypes/events/DELETE_BREED_FAILED",
    DELETE_BREED_SUCCEEDED:"petTypes/events/DELETE_BREED_SUCCEEDED",


};

const petTypeDocActions = {
};

const petTypeCommands = {
	ADD_PET_TYPE:"petTypes/command/ADD_PET_TYPE",
    ADD_BREED:"petTypes/command/ADD_PET_TYPE",
    DELETE_PET_TYPE:"petTypes/command/DELETE_PET_TYPE",
    DELETE_BREED:"petTypes/command/DELETE_BREED",
    UPDATE_PET_TYPE:"petTypes/command/UPDATE_PET_TYPE"

};

const initData = {
    petTypes:{}
};

let petTypeReducer = function(state=initData, {type, payload}){
	switch (type) {
	    default:{
			break;
		}
	}
	return state;
};


let petTypeSaga = function*() {



    yield takeEvery(petTypeCommands.ADD_PET_TYPE, function*(action) {
        console.log(action)
        yield put({type: petTypeEvents.ADD_PET_TYPE_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/app-data/pet-types`,
                method: httpMethods.POST,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: petTypeEvents.ADD_PET_TYPE_FAILED,
                postSuccessAction: petTypeEvents.ADD_PET_TYPE_SUCCEEDED
            }
        });
    });

    yield takeEvery(petTypeCommands.ADD_BREED, function*(action) {
        console.log(action)
        yield put({type: petTypeEvents.ADD_BREED_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/app-data/pet-types/${action.payload.pet_id}/breeds`,
                method: httpMethods.POST,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: petTypeEvents.ADD_BREED_FAILED,
                postSuccessAction: petTypeEvents.ADD_BREED_SUCCEEDED
            }
        });
    });




    yield takeEvery(petTypeCommands.UPDATE_PET_TYPE, function*(action) {
        console.log(action)
        yield put({type: petTypeEvents.UPDATE_PET_TYPE_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/app-data/pet-types/${action.payload.pet_id}`,
                method: httpMethods.PUT,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: petTypeEvents.UPDATE_PET_TYPE_FAILED,
                postSuccessAction: petTypeEvents.UPDATE_PET_TYPE_SUCCEEDED
            }
        });
    });






    yield takeEvery(petTypeCommands.DELETE_PET_TYPE, function*(action) {
        console.log(action)
        yield put({type: petTypeEvents.DELETE_PET_TYPE_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/app-data/pet-types/${action.payload.data}`,
                method: httpMethods.DELETE,

            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: petTypeEvents.DELETE_PET_TYPE_FAILED,
                postSuccessAction: petTypeEvents.DELETE_PET_TYPE_SUCCEEDED
            }
        });
    });

    yield takeEvery(petTypeCommands.DELETE_BREED, function*(action) {
        console.log(action)
        yield put({type: petTypeEvents.DELETE_BREED_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/app-data/pet-types/${action.payload.pet_id}/breeds/${action.payload.breed_id}`,
                method: httpMethods.DELETE,

            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: petTypeEvents.DELETE_BREED_FAILED,
                postSuccessAction: petTypeEvents.DELETE_BREED_SUCCEEDED
            }
        });
    });










}


export {
    petTypeEvents,
    petTypeDocActions,
    petTypeCommands,
    petTypeReducer,
    petTypeSaga
}
