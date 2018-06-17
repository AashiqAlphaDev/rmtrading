import {
	ADD_COUNTRY_FAILED,
	ADD_COUNTRY_SUCCEDED,
	COUNTRY_CLEAR_MATCHES,
	FAILED_FETCH_COUNTRIES,
	FETCHED_COUNTRIES,
	QUERY_COUNTRIES, REQUEST_ADD_COUNTRY
} from "./actions";

const initVetCenterData = {
	list:[]
};

function countriesReducer(state = initVetCenterData, action) {
	switch (action.type) {
		case COUNTRY_CLEAR_MATCHES:{
			state = {...state, list:[], addedCountry:null};
			break;
		}
		case FETCHED_COUNTRIES:{
			state = {...state, fetchError:null, list:action.payload, isQueryInProgress:false};
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
		case QUERY_COUNTRIES:{
			state = {...state, fetchError:null, isQueryInProgress:true};
			break;
		}
		default:{
			break;
		}
	}
	return state;
}

export default countriesReducer;