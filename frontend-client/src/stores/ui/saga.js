import {loginUiSaga} from "../../admin/auth/login/store/saga";
import {signupUiSaga} from "../../admin/auth/signup/store/saga";
import {authUiSaga} from "../../admin/auth/store/saga";

let attachUiMiddlewares = function(middleWare){
	middleWare.run(loginUiSaga);
	middleWare.run(signupUiSaga);
	middleWare.run(authUiSaga);
}

export {attachUiMiddlewares}