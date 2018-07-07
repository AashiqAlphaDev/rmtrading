const vetCenterDocActions = {
    VET_CENTER_FETCHED:"vetCenter/doc/VET_CENTER_FETCHED"
};

const initAuthData = {
    centers:[]
};

function vetCenterReducer(state = initAuthData, {type,payload}) {
	switch (type) {
		case vetCenterDocActions.VET_CENTER_FETCHED : {
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