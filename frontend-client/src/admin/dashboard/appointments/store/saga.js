import {takeEvery,put} from "redux-saga/effects";
import {vetCenterCommands, vetCenterEvents} from "../../../../stores/entities/vet-centers/sagas";
const actions = {
	APPOINTMENTS_MENU_ITEM_WILL_LOAD:"dashboard/ui/events/APPOINTMENTS_MENU_ITEM_WILL_LOAD",
    DELETE_QUEUE :"dashboard/ui/events/DELETE_QUEUE"

}

let saga = function *() {

    yield takeEvery(actions.APPOINTMENTS_MENU_ITEM_WILL_LOAD, function* () {
        yield put({type:vetCenterCommands.FETCH_VET_CENTER});
    });


    yield takeEvery(vetCenterEvents.DELETE_QUEUE_SUCCEEDED,function*(){
        yield put ({type:vetCenterCommands.FETCH_VET_CENTER})
    })

    yield takeEvery(vetCenterEvents.ADD_QUEUE_SUCCEEDED,function*(){
        yield put ({type:vetCenterCommands.FETCH_VET_CENTER})
    })


}

export {
	actions as appointmentsUiEvents,
	saga as appointmentsUiSaga
}