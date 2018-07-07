import {loginUiSaga} from "../../admin/auth/login/store/saga";
import {signupUiSaga} from "../../admin/auth/signup/store/saga";
import {authUiSaga} from "../../admin/auth/store/saga";
import {dashboardUiSaga} from "../../admin/dashboard/store/saga";
import {overviewUiSaga} from "../../admin/dashboard/overview/store/saga";
import {petsUiSaga} from "../../admin/dashboard/pets/store/saga";
import {appointmentsUiSaga} from "../../admin/dashboard/appointments/store/saga";

let attachUiMiddlewares = function(middleWare){
	middleWare.run(loginUiSaga);
	middleWare.run(signupUiSaga);
	middleWare.run(authUiSaga);
	middleWare.run(dashboardUiSaga);
	middleWare.run(overviewUiSaga);
	middleWare.run(petsUiSaga);
	middleWare.run(appointmentsUiSaga);
}

export {attachUiMiddlewares}