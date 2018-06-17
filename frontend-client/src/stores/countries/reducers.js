import {
	ADD_COUNTRY_FAILED,
	ADD_COUNTRY_SUCCEDED, ADD_STATE_SUCCEDED,
	COUNTRY_CLEAR_MATCHES,
	FAILED_FETCH_COUNTRIES, FAILED_FETCH_STATES,
	FETCHED_COUNTRIES, FETCHED_STATES,
	QUERY_COUNTRIES, REQUEST_ADD_COUNTRY, STATE_CLEAR_MATCHES
} from "./actions";

const initVetCenterData = {
	list:[],
	state_list:[]
};

function countriesReducer(state = initVetCenterData, action) {
	switch (action.type) {
		case COUNTRY_CLEAR_MATCHES:{
			state = {...state, list:[], addedCountry:null};
			break;
		}
		case STATE_CLEAR_MATCHES:{
			state = {...state, state_list:[], addedState:null};
			break;
		}
		case FETCHED_COUNTRIES:{
			state = {...state, fetchError:null, list:action.payload, isQueryInProgress:false};
			break;
		}
		case FETCHED_STATES:{
			state = {...state, fetchError:null, state_list:action.payload, isQueryInProgress:false};
			break;
		}
		case REQUEST_ADD_COUNTRY:{
			state = {...state, addingCountryInProgress:true};
			break;
		}
		case ADD_COUNTRY_SUCCEDED:{
			state = {...state, addedCountry:action.payload, addingCountryInProgress:false};
			break;
		}
		case ADD_COUNTRY_FAILED:{
			state = {...state, addedCountryError:action.payload, addingCountryInProgress:false};
			break;
		}
		case FAILED_FETCH_COUNTRIES:{
			state = {...state, fetchError:action.payload, isQueryInProgress:false};
			break;
		}
		case FAILED_FETCH_STATES:{
			state = {...state, fetchError:action.payload, isQueryInProgress:false};
			break;
		}
		case QUERY_COUNTRIES:{
			state = {...state, fetchError:null, isQueryInProgress:true};
			break;
		}
		case ADD_STATE_SUCCEDED:{
			state = {...state, addedState:action.payload, addingCountryInProgress:false};
			break;
		}
		default:{
			break;
		}
	}
	return state;
}

export default countriesReducer;