import {CLEAR_TOKENS, GENERATE_TOKENS_SUCCEDED, REQUEST_GENERATE_TOKENS} from "./actions";

const initTokens = {
	list: [],
	tokensGenerated:true
};

function tokensReducer(state = initTokens, action) {
	switch (action.type) {
		case CLEAR_TOKENS:{
			state = {...state, list:action.payload, tokensGenerated:false}
			break;
		}
		case REQUEST_GENERATE_TOKENS:{
			state = {...state, tokensGenerated:false};
			break;
		}
		case GENERATE_TOKENS_SUCCEDED:{
			state = {...state, list:action.payload, tokensGenerated:true}
			break;
		}
		default: {
			break;
		}
	}
	return state;
}




export default tokensReducer;