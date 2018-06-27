import {
	ADD_PET_TYPE_FAILED,
	ADD_PET_TYPE_SUCCEEDED, ADD_BREED_SUCCEEDED,
	PET_TYPE_CLEAR_MATCHES,
	QUERY_PET_TYPES_FAILED, QUERY_BREEDS_FAILED,
	QUERY_PET_TYPES_SUCCEEDED, QUERY_BREEDS_SUCCEEDED,
	QUERY_PET_TYPES, REQUEST_ADD_PET_TYPE, BREED_CLEAR_MATCHES,
	REQUEST_UPDATE_PET_TYPE,
	UPDATE_PET_TYPE_SUCCEEDED,
	UPDATE_PET_TYPE_FAILED, PET_TYPE_FETCH_SUCCEEDED,
	REQUEST_ADD_VISIT,
	ADD_VISIT_SUCCEEDED,
	ADD_VISIT_FAILED
} from "./actions";

const initPetTypes = {
	list: [],
	breed_list: [],
	petTypeDetail: {}
};

function petTypesReducer(state = initPetTypes, action) {
	switch (action.type) {
		case PET_TYPE_CLEAR_MATCHES: {
			state = {...state, list: [], addedPetType: null, petTypeDetail: {}};
			break;
		}
		case REQUEST_ADD_VISIT :{
			state = {...state,addingVisitInProgress:true}
			break;
		}
		case ADD_VISIT_SUCCEEDED :{
			state = {...state,addingVisitInProgress:false}
			break;
		}
		case ADD_VISIT_FAILED :{
			state = {...state,addingVisitInProgress:false}
			break;
		}

		case BREED_CLEAR_MATCHES: {
			state = {...state, breed_list: [], addedBreed: null};
			break;
		}
		case QUERY_PET_TYPES_SUCCEEDED: {
			state = {...state, fetchError: null, list: action.payload, isQueryInProgress: false};
			break;
		}
		case QUERY_BREEDS_SUCCEEDED: {
			state = {...state, fetchError: null, breed_list: action.payload, isQueryInProgress: false};
			break;
		}
		case REQUEST_UPDATE_PET_TYPE: {
			state = {...state, updatingPetTypeInProgress: true};
			break;
		}
		case PET_TYPE_FETCH_SUCCEEDED: {
			state = {...state, petTypeDetail: action.payload}
		}
		case UPDATE_PET_TYPE_SUCCEEDED: {
			state = {...state, updatingPetTypeInProgress: false};
			break;
		}
		case UPDATE_PET_TYPE_FAILED: {
			state = {...state, updatingPetTypeInProgress: false};
			break
		}
		case REQUEST_ADD_PET_TYPE: {
			state = {...state, addingPetTypeInProgress: true};
			break;
		}
			;

		case ADD_PET_TYPE_SUCCEEDED: {
			state = {...state, addedPetType: action.payload, addingPetTypeInProgress: false};
			break;
		}
		case ADD_PET_TYPE_FAILED: {
			state = {...state, addedPetTypeError: action.payload, addingPetTypeInProgress: false};
			break;
		}
		case QUERY_PET_TYPES_FAILED: {
			state = {...state, fetchError: action.payload, isQueryInProgress: false};
			break;
		}
		case QUERY_BREEDS_FAILED: {
			state = {...state, fetchError: action.payload, isQueryInProgress: false};
			break;
		}
		case QUERY_PET_TYPES: {
			state = {...state, fetchError: null, isQueryInProgress: true};
			break;
		}
		case ADD_BREED_SUCCEEDED: {
			state = {...state, addedBreed: action.payload, addingPetTypeInProgress: false};
			break;
		}
		default: {
			break;
		}
	}
	return state;
}

export default petTypesReducer;