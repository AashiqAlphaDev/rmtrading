import {authUiSaga} from "../../admin/auth/store/saga";
import {appointmentsUiSaga} from "../../admin/dashboard/appointments/store/saga";
import {overviewUiSaga} from "../../admin/dashboard/pets/store/saga";
import {requestsUiSaga} from "../../admin/dashboard/requests/store/saga";
import {authUiSaga as superAdminAuthUiSaga} from "../../super-admin/auth/store/saga";
import {overviewUiSaga as superAdminOverViewSaga} from "../../super-admin/dashboard/overview/store/saga";
import {requestsUiSaga as superAdminRequestsUiSaga} from "../../super-admin/dashboard/requests/store/saga";

let uiSaga = function*(){
	yield authUiSaga();
	yield superAdminAuthUiSaga();
	yield appointmentsUiSaga();
	yield overviewUiSaga();
	yield superAdminOverViewSaga();
	yield requestsUiSaga();
	yield superAdminRequestsUiSaga();
};

export {uiSaga};