import {put, takeLatest} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"

const petEvents = {
    FETCH_PETS_STARTED:"pets/events/FETCH_PETS_STARTED",
    FETCH_PETS_FAILED:"pets/events/FETCH_PETS_FAILED",
    FETCH_PETS_SUCCEEDED:"pets/events/FETCH_PETS_SUCCEEDED",

};

const petDocActions = {
    SET_PETS:"pets/command/SET_PETS"
};

const petCommands = {
    FETCH_PETS:"guardian/command/FETCH_PETS"
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
	yield takeLatest(petCommands.FETCH_PETS, function* (action) {
		yield put({type:petEvents.FETCH_PETS_STARTED});
		yield put({
			type: appActions.API,
			payload: {
				url: `/pets/?${action.payload.query}`,
				method: httpMethods.GET
			},
			meta: {
				callbackId:action.payload.callbackId,
				postFailureAction: petEvents.FETCH_PETS_FAILED,
				onSuccess:function*(payload){
					yield put({type:petDocActions.SET_PETS, payload:payload.docs});
					yield put({type:petEvents.FETCH_PETS_SUCCEEDED, payload:_.map(payload.docs, (item)=>{return item._id})})
				}
			}
		});
	});

};







export {
    petEvents,
    petDocActions,
    petCommands,
    petReducer,
    petSaga
}
