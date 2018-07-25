import {takeEvery} from "redux-saga/effects"
import React from "react"
import Router from 'next/router'

import {authEvents as superAdminAuthEvents} from "../../store/domain/auth";

const superAdminAuthUiEvents = {

};

const superAdminAuthUiCommands = {

};

const superAdminAuthUiActions = {

};

const superAdminAuthUiReducer = function () {
    return {}
};

const superAdminAuthUiSaga = function*(){

    
    yield takeEvery(superAdminAuthEvents.SUPER_ADMIN_LOGIN_SUCCEEDED, function*() {
        Router.push('/super-admin-dashboard/overview');
    })
    yield takeEvery(superAdminAuthEvents.SUPER_ADMIN_LOGIN_FAILED, function*() {
        Router.push('/super-admin-dashboard/login');
    })


};


export default class {
}



export {

    superAdminAuthUiReducer,
    superAdminAuthUiSaga
}