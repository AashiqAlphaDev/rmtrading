import {petEvents} from "./sagas";

const petDocActions = {
};

const initAuthData = {
    pets:[]
};

function petReducer(state = initAuthData, {type,payload}) {
	switch (type) {
		case petEvents.FETCH_PET_SUCCEEDED : {
            state = {...state, pets:payload};
            break
        }
		default: {
			break;
		}

	}
	return state;
}




export {petReducer, petDocActions};