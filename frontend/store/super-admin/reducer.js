import {
	SUPER_SIGN_OUT_REQUESTED,
	SUPER_SIGN_OUT_FAILED,
	SUPER_SIGN_OUT_SUCCEEDED
} from "./auth-actions";

import {
	DISEASES_CLEAR_MATCHES,
	DISEASES_FETCH_MATCHES,
	DISEASES_FETCH_MATCHES_FAILED,
	DISEASES_FETCH_MATCHES_SUCCEDED,

	PET_TYPE_CLEAR_MATCHES,
	PET_TYPE_FETCH_MATCHES,
	PET_TYPE_FETCH_MATCHES_FAILED,
	PET_TYPE_FETCH_MATCHES_SUCCEDED,

	PET_BREED_CLEAR_MATCHES,
	PET_BREED_FETCH_MATCHES,
	PET_BREED_FETCH_MATCHES_FAILED,
	PET_BREED_FETCH_MATCHES_SUCCEDED,

} from "./app-data-actions";

import {
	combineReducers
} from "redux";

const initialAuthState = {
	authInProgress: false,
	authError: null,
	successRedirect: null
};

const authReducer = function (state = initialAuthState, action) {
	switch (action.type) {
		case SUPER_SIGN_OUT_REQUESTED: {
			state = {...state, authInProgress: true, authError: null}
			return state;
		}
		case SUPER_SIGN_OUT_FAILED: {
			state = {...state, authInProgress: false, authError: action.payload};
			return state;
		}
		case SUPER_SIGN_OUT_SUCCEEDED: {
			state = {...state, authInProgress: false, successRedirect: "/super-admin/auth"};
			return state;
		}
	}
	return  state;
}

const initialDiseases = {
	query:null,
	matched_diseases:[],
	fetch_matches_error:null,
	selected_disease:null
};

const diseaseListReducer = function(state=initialDiseases, action){
	switch (action.type) {
		case DISEASES_CLEAR_MATCHES:{
			state = {...state, matched_diseases:[]};
			return state;
		}
		case DISEASES_FETCH_MATCHES:{
			state = {...state, fetch_matches_error:null, query:action.payload.query};
			return state;
		}
		case DISEASES_FETCH_MATCHES_SUCCEDED:{
			state = {...state, matched_diseases:action.payload};
			return state;
		}
		case DISEASES_FETCH_MATCHES_FAILED:{
			state = {...state, fetch_matches_error:action.payload};
			return state;
		}
	}
	return state;
};


const initialPetTypes = {
	query:null,
	matched_pet_types:[],
	fetch_matches_error:null,
	selected_type:null
};

const petTypeListReducer = function(state=initialPetTypes, action){
	switch (action.type) {
		case PET_TYPE_CLEAR_MATCHES:{
			state = {...state, matched_pet_types:[]};
			return state;
		}
		case PET_TYPE_FETCH_MATCHES:{
			state = {...state, fetch_matches_error:null, query:action.payload.query};
			return state;
		}
		case PET_TYPE_FETCH_MATCHES_SUCCEDED:{
			state = {...state, matched_pet_types:action.payload};
			return state;
		}
		case PET_TYPE_FETCH_MATCHES_FAILED:{
			state = {...state, fetch_matches_error:action.payload};
			return state;
		}
	}
	return state;
};

const initialPetBreeds = {
	query:null,
	matched_pet_breeds:[],
	fetch_matches_error:null,
	selected_breed:null
};

const petBreedListReducer = function(state=initialPetBreeds, action){
	switch (action.type) {
		case PET_BREED_CLEAR_MATCHES:{
			state = {...state, matched_pet_breeds:[]};
			return state;
		}
		case PET_BREED_FETCH_MATCHES:{
			state = {...state, fetch_matches_error:null, query:action.payload.query};
			return state;
		}
		case PET_BREED_FETCH_MATCHES_SUCCEDED:{
			state = {...state, matched_pet_breeds:action.payload};
			return state;
		}
		case PET_BREED_FETCH_MATCHES_FAILED:{
			state = {...state, fetch_matches_error:action.payload};
			return state;
		}
	}
	return state;
};



export default combineReducers({authData: authReducer, diseaseList:diseaseListReducer, petTypeList:petTypeListReducer, petBreedList:petBreedListReducer});