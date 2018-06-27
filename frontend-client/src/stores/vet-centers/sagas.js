import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
	ADD_VET_CENTER_FAILED,
	ADD_VET_CENTER_SUCCEEDED,
	QUERY_VET_CENTERS,
	REQUEST_ADD_VET_CENTER,
	DELETE_VET_CENTER_FAILED,
	DELETE_VET_CENTER_SUCCEEDED,
	QUERY_VET_CENTERS_SUCCEEDED,
	QUERY_VET_CENTERS_FAILED,
	REQUEST_DELETE_VET_CENTER,
	REQUEST_VET_CENTER_FETCH,
	VET_CENTER_FETCH_SUCCEEDED,
	VET_CENTER_FETCH_FAILED,
	REQUEST_ADD_ADMIN,
	ADD_ADMIN_SUCCEEDED,
	ADD_ADMIN_FAILED,
	REQUEST_ADMINS_FETCH,
	ADMINS_FETCH_SUCCEEDED,
	ADMINS_FETCH_FAILED,
	DELETE_ADMIN_SUCCEEDED,
	DELETE_ADMIN_FAILED,
	REQUEST_DELETE_ADMIN,
	REQUEST_ADD_QUEUE,
	ADD_QUEUE_SUCCEEDED,
	REQUEST_QUEUES_FETCH,
	REQUEST_DELETE_QUEUE,
	ADD_QUEUE_FAILED,
	DELETE_QUEUE_SUCCEEDED,
	DELETE_QUEUE_FAILED,
	REQUEST_ADD_SLOT,
	REQUEST_DELETE_SLOT,
	REQUEST_UPDATE_SLOT_INTERVAL,
	ADD_SLOT_SUCCEEDED, ADD_SLOT_FAILED
} from "./actions";
import base_url from "../base_url";

let queryVetCenters = function* (action) {
	try {
		var url = (action.payload && action.payload.query) ? `${base_url}/vaccination-centers?q=${action.payload.query}` : `${base_url}/vaccination-centers`;
		const response = yield call(fetch, url, {
			credentials: 'include'
		});
		if (response.ok) {
			console.log(response)
			yield put({type: QUERY_VET_CENTERS_SUCCEEDED, payload: yield response.json()});
		}
		else {
			yield put({type: QUERY_VET_CENTERS_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		console.log(error)
		yield put({type: QUERY_VET_CENTERS_FAILED, payload: error});
	}
};

let addVetCenter = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/vaccination-centers`, {
			method: "POST",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(action.payload)
		});
		if (response.ok) {
			yield put({type: ADD_VET_CENTER_SUCCEEDED, payload: yield response.json()});
		}
		else {
			yield put({type: ADD_VET_CENTER_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_VET_CENTER_FAILED, payload: error});
	}
};


let deleteVetCenter = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/vaccination-centers/${action.payload.center_id}`, {
			method: "DELETE",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(action.payload)
		});
		if (response.ok) {
			yield put({type: DELETE_VET_CENTER_SUCCEEDED, payload: yield response.json()});
		}
		else {
			yield put({type: DELETE_VET_CENTER_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: DELETE_VET_CENTER_FAILED, payload: error});
	}
};

let fetchVetCenter = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/vaccination-centers/${action.payload.center_id}`, {
			credentials: 'include'
		});
		if (response.ok) {
			yield put({type: VET_CENTER_FETCH_SUCCEEDED, payload: yield response.json()});
		}
		else {
			yield put({type: VET_CENTER_FETCH_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: VET_CENTER_FETCH_FAILED, payload: error});
	}
};

let addAdmin = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/vaccination-centers/${action.payload.center_id}/admins`, {
			method: "POST",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(action.payload)
		});
		if (response.ok) {
			yield put({type: ADD_ADMIN_SUCCEEDED, payload: yield response.json()});
		}
		else {
			yield put({type: ADD_ADMIN_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_ADMIN_FAILED, payload: error});
	}
};

let addQueue = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/vaccination-centers/${action.payload.center_id}`, {
			method: "PUT",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({$push: {queues: action.payload.queue_data}})
		});
		if (response.ok) {
			yield put({type: ADD_QUEUE_SUCCEEDED, payload: yield response.json()});
			yield put({type: REQUEST_VET_CENTER_FETCH, payload: {center_id: action.payload.center_id}});

		}
		else {
			yield put({type: ADD_QUEUE_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_QUEUE_FAILED, payload: error});
	}
};

let addSlot = function* (action) {
	try {
		console.log({$push: {time_slots: action.payload.slot_data}})
		const response = yield call(fetch, `${base_url}/vaccination-centers/${action.payload.center_id}/queues/${action.payload.queue_id}`, {
			method: "PUT",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({$push: {"queues.$.time_slots": action.payload.slot_data}})
		});
		if (response.ok) {
			yield put({type: ADD_SLOT_SUCCEEDED, payload: yield response.json()});
			yield put({type: REQUEST_VET_CENTER_FETCH, payload: {center_id: action.payload.center_id}});
		}
		else {
			yield put({type: ADD_SLOT_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_SLOT_FAILED, payload: error});
	}
};

let deleteSlot = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/vaccination-centers/${action.payload.center_id}/queues/${action.payload.queue_id}`, {
			method: "PUT",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({$pull: {"queues.$.time_slots": {_id: action.payload.slot_id}}})
		});

		if (response.ok) {
			yield put({type: ADD_QUEUE_SUCCEEDED, payload: yield response.json()});
			yield put({type: REQUEST_VET_CENTER_FETCH, payload: {center_id: action.payload.center_id}});

		}
		else {
			yield put({type: ADD_QUEUE_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_QUEUE_FAILED, payload: error});
	}
};


let deleteAdmin = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/vaccination-centers/${action.payload.center_id}/admins/${action.payload.admin_id}`, {
			method: "DELETE",
			credentials: 'include',
		});
		if (response.ok) {
			yield put({type: DELETE_ADMIN_SUCCEEDED, payload: yield response.json()});
			yield put({type: REQUEST_ADMINS_FETCH, payload: {center_id: action.payload.center_id}});
		}
		else {
			yield put({type: DELETE_ADMIN_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: DELETE_ADMIN_FAILED, payload: error});
	}
};

let deleteQueue = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/vaccination-centers/${action.payload.center_id}`, {
			method: "PUT",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({$pull: {queues: {_id: action.payload.queue_id}}})
		});
		if (response.ok) {
			yield put({type: DELETE_QUEUE_SUCCEEDED, payload: yield response.json()});
			yield put({type: REQUEST_VET_CENTER_FETCH, payload: {center_id: action.payload.center_id}});
		}
		else {
			yield put({type: DELETE_QUEUE_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: DELETE_QUEUE_FAILED, payload: error});
	}
};


let fetchAdmins = function* (action) {
	try {
		var center_id = action.payload.center_id || action.payload.vaccination_center || action.payload._id;
		const response = yield call(fetch, `${base_url}/vaccination-centers/${center_id}/admins`, {
			credentials: 'include'
		});
		if (response.ok) {
			yield put({type: ADMINS_FETCH_SUCCEEDED, payload: yield response.json()});
		}
		else {
			yield put({type: ADMINS_FETCH_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: ADMINS_FETCH_FAILED, payload: error});
	}
};

let updateSlotInterval = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/vaccination-centers/${action.payload.center_id}`, {
			method: "PUT",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({appointments_per_hour: action.payload.slot_interval})
		});
		if (response.ok) {
			yield put({type: DELETE_QUEUE_SUCCEEDED, payload: yield response.json()});
			yield put({type: REQUEST_VET_CENTER_FETCH, payload: {center_id: action.payload.center_id}});
		}
		else {
			yield put({type: DELETE_QUEUE_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: DELETE_QUEUE_FAILED, payload: error});
	}
};


function* vetCentersSaga() {
	yield takeLatest(QUERY_VET_CENTERS, queryVetCenters);
	yield takeEvery(REQUEST_ADD_VET_CENTER, addVetCenter);
	yield takeEvery(REQUEST_DELETE_VET_CENTER, deleteVetCenter);
	yield takeEvery(DELETE_VET_CENTER_SUCCEEDED, queryVetCenters);
	yield takeEvery(REQUEST_VET_CENTER_FETCH, fetchVetCenter);

	yield takeEvery(REQUEST_ADD_ADMIN, addAdmin);
	yield takeEvery(ADD_ADMIN_SUCCEEDED, fetchAdmins);
	yield takeEvery(REQUEST_ADMINS_FETCH, fetchAdmins);
	yield takeEvery(VET_CENTER_FETCH_SUCCEEDED, fetchAdmins);
	yield takeEvery(REQUEST_DELETE_ADMIN, deleteAdmin);


	yield takeEvery(REQUEST_ADD_QUEUE, addQueue);
	yield takeEvery(REQUEST_QUEUES_FETCH, fetchVetCenter);
	yield takeEvery(REQUEST_DELETE_QUEUE, deleteQueue);

	yield takeEvery(REQUEST_ADD_SLOT, addSlot);
	yield takeEvery(REQUEST_DELETE_SLOT, deleteSlot);

	yield takeEvery(REQUEST_UPDATE_SLOT_INTERVAL, updateSlotInterval)

}

export default vetCentersSaga;