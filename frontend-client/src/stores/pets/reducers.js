import {CLEAR_PET, GUARDIAN_FETCH_SUCCEDED, PET_FETCH_FAILED, PET_FETCH_SUCCEDED} from "./actions";
import {CLEAR_GUARDIAN} from "./actions";
import {GUARDIAN_FETCH_FAILED} from "./actions";

const initPets = {
	list: []
};

function petsReducer(state = initPets, action) {
	switch (action.type) {
		default: {
			break;
		}
	}
	return state;
}

const initGuardianDetail = {}

function guardianDetailReducer(state = initGuardianDetail, action) {
	switch (action.type) {
		case CLEAR_GUARDIAN: {
			state = initGuardianDetail;
			break;
		}
		case GUARDIAN_FETCH_SUCCEDED: {
			state = {...state, ...action.payload};
			break;
		}
		case GUARDIAN_FETCH_FAILED: {
			if (!action.payload._id) {
				state = {...state, noMatch: true};
			}
			break;
		}
		default: {
			break;
		}
	}
	return state;
}


const petDetail = {}

function petDetailReducer(state = petDetail, action) {
	switch (action.type) {
		case CLEAR_PET: {
			state = initGuardianDetail;
			break;
		}
		case PET_FETCH_SUCCEDED: {
			state = {...state, ...action.payload};
			break;
		}
		case PET_FETCH_FAILED: {
			if (!action.payload._id) {
				state = {...state, noMatch: true};
			}
			break;
		}
		default: {
			break;
		}
	}
	return state;
}


export {petsReducer, guardianDetailReducer, petDetailReducer};