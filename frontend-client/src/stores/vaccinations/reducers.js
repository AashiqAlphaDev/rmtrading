import {QUERY_VACCINATIONS_SUCCEDED} from "./actions";

const vaccinationsInitData = {
	list: []
};

function vaccinationReducer(state = vaccinationsInitData, action) {
	switch (action.type) {
		case QUERY_VACCINATIONS_SUCCEDED: {
			state = {...state, list:action.payload.docs};
			break;
		}
		default: {
			break;
		}
	}
	return state;
}

export default vaccinationReducer;