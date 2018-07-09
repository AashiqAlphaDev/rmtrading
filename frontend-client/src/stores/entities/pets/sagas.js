import {put, takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../../app/saga";

let vetCenterCommands = {
	FETCH_VET_CENTER: "vetCenter/command/FETCH_VET_CENTER",
	DELETE_QUEUE:"vetCenter/command/DELETE_QUEUE",
 	UPDATE_SLOT_INTERVAL:"vetCenter/command/UPDATE_SLOT_INTERVAL",
	ADD_QUEUE:"vetCenter/command/ADD_QUEUE",
	ADD_SLOT:"vetCenter/command/ADD_SLOT",
	DELETE_SLOT:"vetCenter/command/DELETE_SLOT"

};

let vetCenterEvents = {

	FETCH_VET_CENTER_STARTED: "vetCenter/events/FETCH_VET_CENTER_STARTED",
	FETCH_VET_CENTER_SUCCEEDED: "vetCenter/events/FETCH_VET_CENTER_SUCCEEDED",
	FETCH_VET_CENTER_FAILED: "vetCenter/events/FETCH_VET_CENTER_FAILED",

	DELETE_QUEUE_STARTED:"vetCenter/events/DELETE_QUEUE_STARTED",
	DELETE_QUEUE_SUCCEEDED:"vetCenter/events/DELETE_QUEUE_SUCCEEDED",
	DELETE_QUEUE_FAILED:"vetCenter/events/DELETE_QUEUE_FAILED",

    ADD_QUEUE_STARTED:"vetCenter/events/ADD_QUEUE_STARTED",
    ADD_QUEUE_SUCCEEDED:"vetCenter/events/ADD_QUEUE_SUCCEEDED",
    ADD_QUEUE_FAILED:"vetCenter/events/ADD_QUEUE_FAILED",

    ADD_SLOT_STARTED:"vetCenter/events/ADD_SLOT_STARTED",
    ADD_SLOT_SUCCEEDED:"vetCenter/events/ADD_SLOT_SUCCEEDED",
    ADD_SLOT_FAILED:"vetCenter/events/ADD_SLOT_FAILED",

    DELETE_SLOT_STARTED:"vetCenter/events/DELETE_SLOT_STARTED",
    DELETE_SLOT_SUCCEEDED:"vetCenter/events/DELETE_SLOT_SUCCEEDED",
    DELETE_SLOT_FAILED:"vetCenter/events/DELETE_SLOT_FAILED"

}

let vetCenterSaga = function* () {

	yield takeEvery(vetCenterCommands.FETCH_VET_CENTER, function* (action) {
		yield put({type:vetCenterEvents.FETCH_VET_CENTER_STARTED});
		yield put({
			type: appActions.API,
			payload: {
				url: '/vaccination-centers/self',
				method: httpMethods.GET
			},
			meta: {
				postFailureAction: vetCenterEvents.FETCH_VET_CENTER_FAILED,
				postSuccessAction: vetCenterEvents.FETCH_VET_CENTER_SUCCEEDED
			}
		});
	});


	yield takeEvery(vetCenterCommands.DELETE_QUEUE,function*(action){
		yield put({type:vetCenterEvents.DELETE_QUEUE_STARTED});
		yield put ({
			type:appActions.API,
			payload:{
                url: '/vaccination-centers/'+action.payload.center_id,
				method:httpMethods.PUT,
                body:JSON.stringify({ $pull: { queues: {_id:action.payload.queue_id} } })
			},
			meta:{
				postFailureAction:vetCenterEvents.DELETE_QUEUE_FAILED,
                postSuccessAction:vetCenterEvents.DELETE_QUEUE_SUCCEEDED
			}
		})
	})

    yield takeEvery(vetCenterCommands.ADD_QUEUE,function*(action){
        yield put({type:vetCenterEvents.ADD_QUEUE_STARTED});
        yield put ({
            type:appActions.API,
            payload:{
                url: '/vaccination-centers/'+action.payload.center_id,
                method:httpMethods.PUT,
                body:JSON.stringify({ $push: { queues: action.payload.queue_data } })
            },
            meta:{
                postFailureAction:vetCenterEvents.ADD_QUEUE_FAILED,
                postSuccessAction:vetCenterEvents.ADD_QUEUE_SUCCEEDED
            }
        })
    });



    yield takeEvery(vetCenterCommands.ADD_SLOT,function*(action){
        yield put({type:vetCenterEvents.ADD_SLOT_STARTED});
        yield put ({
            type:appActions.API,
            payload:{
                url: '/vaccination-centers/'+action.payload.center_id+'/queues/'+action.payload.queue_id,
                method:httpMethods.PUT,
                body:JSON.stringify({ $push: { "queues.$.time_slots": action.payload.slot_data } })
            },
            meta:{
                postFailureAction:vetCenterEvents.ADD_SLOT_FAILED,
                postSuccessAction:vetCenterEvents.ADD_SLOT_SUCCEEDED
            }
        })
    });


    yield takeEvery(vetCenterCommands.DELETE_SLOT,function*(action){
        yield put({type:vetCenterEvents.DELETE_SLOT_STARTED});
        yield put ({
            type:appActions.API,
            payload:{
                url: '/vaccination-centers/'+action.payload.center_id+'/queues/'+action.payload.queue_id,
                method:httpMethods.PUT,
                body:JSON.stringify({ $pull: { "queues.$.time_slots": {_id:action.payload.slot_id} } })
            },
            meta:{
                postFailureAction:vetCenterEvents.DELETE_SLOT_FAILED,
                postSuccessAction:vetCenterEvents.DELETE_SLOT_SUCCEEDED
            }
        })
    });













}

export {vetCenterSaga, vetCenterCommands, vetCenterEvents};
