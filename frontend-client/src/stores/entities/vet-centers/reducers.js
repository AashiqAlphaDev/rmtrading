import {vetCenterEvents} from "./sagas";

const vetCenterDocActions = {
};

const initAuthData = {
    centers:[]
};

function vetCenterReducer(state = initAuthData, {type,payload}) {
	switch (type) {
		case vetCenterEvents.FETCH_VET_CENTER_SUCCEEDED : {
            state = {...state, centers:payload};
            break
        }
		default: {
			break;
		}

	}
	return state;
}




export {vetCenterReducer, vetCenterDocActions};