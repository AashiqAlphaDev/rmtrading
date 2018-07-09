import {takeEvery,put} from "redux-saga/effects";
import {vetCenterCommands} from "../../../../stores/entities/vet-centers/sagas";
const actions = {
	APPOINTMENTS_MENU_ITEM_WILL_LOAD:"dashboard/ui/events/APPOINTMENTS_MENU_ITEM_WILL_LOAD"
}

let saga = function *() {

    yield takeEvery(actions.APPOINTMENTS_MENU_ITEM_WILL_LOAD, function* (action) {
        yield put({type:vetCenterCommands.FETCH_VET_CENTER});
    });


}

export {
	actions as appointmentsUiEvents,
	saga as appointmentsUiSaga
}