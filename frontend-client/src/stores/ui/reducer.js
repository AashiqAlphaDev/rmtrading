import {combineReducers} from "redux";
import {authUiReducer} from "./auth";

export default combineReducers({auth:authUiReducer})