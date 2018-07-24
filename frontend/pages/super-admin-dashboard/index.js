import {takeEvery} from "redux-saga/effects"
import React from "react"
import Router from 'next/router'

import {authEvents as userAuthEvents} from "../../store/domain/auth";

const userAuthUiEvents = {

};

const userAuthUiCommands = {

};

const userAuthUiActions = {

};

const userAuthUiReducer = function () {
    return {}
};

const userAuthUiSaga = function*(){

    console.log("this")
    yield takeEvery(userAuthEvents.SUPER_ADMIN_LOGIN_SUCCEEDED, function*() {
        Router.push('/super-admin-dashboard/dashboard');
    })
    yield takeEvery(userAuthEvents.SUPER_ADMIN_LOGIN_FAILED, function*() {
        Router.push('/super-admin-dashboard/login');
    })


};


export default class {
}



export {

    userAuthUiReducer,
    userAuthUiSaga
}