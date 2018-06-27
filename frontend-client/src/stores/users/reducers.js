const initialUserData = {
	guardians:{}
};

const userDocActions = {
	SET_GUARDIANS:"user/document/SET_GUARDIANS",
	SET_GUARDIAN:"user/document/SET_GUARDIAN"
}

function userReducer(state = initialUserData, {type, payload}) {
	switch (type) {
		case userDocActions.SET_GUARDIANS:{
			var newGuardians = {};
			payload.map((item)=>{newGuardians[item._id] = item});
			state = {...state, guardians:{...state.guardians, ...newGuardians}};
		}
		case userDocActions.SET_GUARDIAN:{
			state = {...state, guardians:{...state.guardians, [payload._id]:payload}};
		}
		default: {
			break;
		}
	}
	return state;
}

export {userReducer, userDocActions};