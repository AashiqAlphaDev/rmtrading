import {guardianEvents} from "./sagas";

const guardianDocActions = {
};

const initGuardianData = {
    guardian:{}
};

function guardianReducer(state = initGuardianData, {type,payload}) {
	switch (type) {
		case guardianEvents.FETCH_GUARDIAN_SUCCEEDED : {
            state = {...state, guardian:payload};
            break
        }
		default: {
			break;
		}

	}
	return state;
}




export {guardianReducer, guardianDocActions};