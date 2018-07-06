const actions = {
    SET_REDIRECT:"login/ui/doc/SET_REDIRECT",
	RESET:"login/ui/doc/RESET"
}

let initData = {

};

let reducer = function(state=initData, {type, payload}){
	switch (type) {
		case actions.SET_REDIRECT:{
			state = {...state, redirect:payload};
			break;
		}
		case actions.RESET:{
            state = {...initData};
            break;
		}
		default:{
			break;
		}

	}
	return state;
}

export {
    actions as loginUiDocActions,
	reducer as loginUiReducer
}