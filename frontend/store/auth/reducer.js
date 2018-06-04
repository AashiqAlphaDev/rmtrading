import {
	SIGN_IN_FAILED,
	SIGN_IN_REQUESTED, SIGN_IN_SUCCEEDED,
	SIGN_UP_FAILED,
	SIGN_UP_REQUESTED, SIGN_UP_SUCCEEDED,
	SUPER_SIGN_IN_FAILED,
	SUPER_SIGN_IN_REQUESTED, SUPER_SIGN_IN_SUCCEEDED
} from "./actions";


const initState = {
	authInProgress:false,
	nonFieldErrors:null,
	emailError:null,
	usernameError:null,
	passwordError:null,
	successRedirect:null
}

export default function(state=initState, action){
	switch (action.type) {
		case SUPER_SIGN_IN_REQUESTED:
		case SIGN_IN_REQUESTED:
		case SIGN_UP_REQUESTED:{
			state = {...state,
				authInProgress:true,
				nonFieldErrors:null,
				emailError:null,
				usernameError:null,
				passwordError:null,
			}
			return state;
		}
		case SUPER_SIGN_IN_FAILED:
		case SIGN_IN_FAILED:
		case SIGN_UP_FAILED:{
			state = {...state, authInProgress:false}
			if(action.payload.email && action.payload.email.length>0){
				state = {...state, emailError:action.payload.email[0]}
			}
			if(action.payload.username && action.payload.username.length>0){
				state = {...state, emailError:action.payload.username[0]}
			}
			if(action.payload.password1 && action.payload.password1.length>0){
				state = {...state, passwordError:action.payload.password1[0]}
			}
			if(action.payload.non_field_errors && action.payload.non_field_errors.length>0){
				state = {...state, nonFieldErrors:action.payload.non_field_errors[0]}
			}
			return state;
		}
		case SUPER_SIGN_IN_SUCCEEDED: {
			state = {...state, authInProgress:false,successRedirect:"/super-admin"}
			return state
		}
		case SIGN_UP_SUCCEEDED: {
			state = {...state, authInProgress:false, successRedirect:"/welcome"}
			return state
		}
		case SIGN_IN_SUCCEEDED: {
			state = {...state, authInProgress:false, successRedirect:"/"}
			return state
		}
	}
	return state
}