import {
	ADD_COUNTRY_FAILED,
	ADD_COUNTRY_SUCCEEDED, ADD_STATE_SUCCEEDED,
	COUNTRY_CLEAR_MATCHES,
	QUERY_COUNTRIES_FAILED, QUERY_STATES_FAILED,
	QUERY_COUNTRIES_SUCCEEDED, QUERY_STATES_SUCCEEDED,
	QUERY_COUNTRIES, REQUEST_ADD_COUNTRY, STATE_CLEAR_MATCHES
} from "./actions";

const initVetCenterData = {
	list: [],
	state_list: []
};

function countriesReducer(state = initVetCenterData, action) {
	switch (action.type) {
		case COUNTRY_CLEAR_MATCHES: {
			state = {...state, list: [], addedCountry: null};
			break;
		}
		case STATE_CLEAR_MATCHES: {
			state = {...state, state_list: [], addedState: null};
			break;
		}
		case QUERY_COUNTRIES_SUCCEEDED: {
			state = {...state, fetchError: null, list: action.payload, isQueryInProgress: false};
			break;
		}
		case QUERY_STATES_SUCCEEDED: {
			state = {...state, fetchError: null, state_list: action.payload, isQueryInProgress: false};
			break;
		}
		case REQUEST_ADD_COUNTRY: {
			state = {...state, addingCountryInProgress: true};
			break;
		}
		case ADD_COUNTRY_SUCCEEDED: {
			state = {...state, addedCountry: action.payload, addingCountryInProgress: false};
			break;
		}
		case ADD_COUNTRY_FAILED: {
			state = {...state, addedCountryError: action.payload, addingCountryInProgress: false};
			break;
		}
		case QUERY_COUNTRIES_FAILED: {
			state = {...state, fetchError: action.payload, isQueryInProgress: false};
			break;
		}
		case QUERY_STATES_FAILED: {
			state = {...state, fetchError: action.payload, isQueryInProgress: false};
			break;
		}
		case QUERY_COUNTRIES: {
			state = {...state, fetchError: null, isQueryInProgress: true};
			break;
		}
		case ADD_STATE_SUCCEEDED: {
			state = {...state, addedState: action.payload, addingCountryInProgress: false};
			break;
		}
		default: {
			break;
		}
	}
	return state;
}

export default countriesReducer;